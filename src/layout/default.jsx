import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import { Outlet } from "react-router-dom";
import Button from '../components/button'
import Modal from '../Modal';
import WhatsNewModalForm from '../WhatsNewModal';

import WhatsNewModal from "../components/modals/whats-new/WhatsNewModal";

const initialSteps = [
  {
    content: <div>Visit recruitment page and start adding leads</div>,
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: true,
    placement: "bottom",
    spotlightClicks: true,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
    target: "#recruitment-tab",
    title: "Visit Recruitment",
  },
  {
    content: "Click on leads on tab",
    placement: "bottom",
    styles: {
      options: {
        zIndex: 10000,
      },
    },
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: true,
    spotlightClicks: true,
    target: "#simple-tab-1",
    title: "Leads",
  },
  {
    content: "Start adding leads",
    placement: "bottom",
    styles: {
      options: {
        zIndex: 10000,
      },
    },
    target: ".add-leads-button",
    title: "Adding leads to your team",
  },
  {
    content: <div>Our rate is off the charts!</div>,
    placement: "bottom",
    spotlightClicks: true,
    target: ".add-leads-button",
    title: "Our Growth",
  },
  {
    content: (
      <div>
        <svg
          aria-hidden="true"
          height="96px"
          preserveAspectRatio="xMidYMid"
          viewBox="0 0 96 96"
          width="96px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M83.2922435,72.3864207 C69.5357835,69.2103145 56.7313553,66.4262214 62.9315626,54.7138297 C81.812194,19.0646376 67.93573,0 48.0030634,0 C27.6743835,0 14.1459311,19.796662 33.0745641,54.7138297 C39.4627778,66.4942237 26.1743334,69.2783168 12.7138832,72.3864207 C0.421472164,75.2265157 -0.0385432192,81.3307198 0.0014581185,92.0030767 L0.0174586536,96.0032105 L95.9806678,96.0032105 L95.9966684,92.1270809 C96.04467,81.3747213 95.628656,75.2385161 83.2922435,72.3864207 Z"
              fill="#000000"
            />
          </g>
        </svg>
      </div>
    ),
    placement: "right",
    target: "#recruitment-tab",
    title: "Our Users",
  },
];

const DefaultLayout = ({ children }) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [isWhatsNewModalOpen, setWhatsNewModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenWhatsNewModal = () => {
    setWhatsNewModalOpen(true);
  };

  const handleCloseWhatsNewModal = () => {
    setWhatsNewModalOpen(false);
  };

  const [{ run, stepIndex, steps }, setState] = useState({
    run: false,
    stepIndex: 0,
    steps: initialSteps,
  });

  const [whatsNewModal, setWhatsNewModal] = useState(false);

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setState({ run: false, stepIndex: 0 });
    } else if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

      if (index === 0) {
        setTimeout(() => {
          setState((prevState) => ({ ...prevState, run: true }));
        }, 400);
      } else if (index === 1) {
        setState((prevState) => ({
          ...prevState,
          run: false,
          stepIndex: nextStepIndex,
        }));

        setTimeout(() => {
          setState((prevState) => ({ ...prevState, run: true }));
        }, 400);
      } else if (index === 2 && action === ACTIONS.PREV) {
        setState((prevState) => ({
          ...prevState,
          run: false,
          stepIndex: nextStepIndex,
        }));

        setTimeout(() => {
          setState((prevState) => ({ ...prevState, run: true }));
        }, 400);
      } else {
        setState((prevState) => ({
          ...prevState,
          stepIndex: nextStepIndex,
        }));
      }
    }
  };

  const handleClickOpen = () => {
    setState((prevState) => ({
      ...prevState,
      run: run,
      stepIndex: stepIndex + 1,
    }));

    setTimeout(() => {
      setState((prevState) => ({ ...prevState, run: true }));
    }, 400);
  };

  return (
    <div>
      <Joyride
        callback={handleJoyrideCallback}
        run={run}
        continuous
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        stepIndex={stepIndex}
      />
      <Header
        handleClickOpen={handleClickOpen}
        handleOpenWhatsNew={() => setWhatsNewModal(true)}
      />
      <div className="p-[20px] bg-white">
        <Outlet context={{ handleClickOpen }} />
      </div>
      {whatsNewModal && (
        <WhatsNewModal
          open={whatsNewModal}
          onClose={() => setWhatsNewModal(false)}
          handleStartGuide={() => {
            setState((prevState) => ({ ...prevState, run: true }));
          }}
        />
      )}
      <>
      <div className="absolute right-0 bottom-0">
        <Button onClick={handleOpenModal}>Add New Announcement</Button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        </Modal>
        <hr></hr>
        <Button onClick={handleOpenWhatsNewModal}>What's New?</Button>
        <WhatsNewModalForm isOpen={isWhatsNewModalOpen} onClose={handleCloseWhatsNewModal}></WhatsNewModalForm>
      </div>
      </>
    </div>
  );
};

export default DefaultLayout;
