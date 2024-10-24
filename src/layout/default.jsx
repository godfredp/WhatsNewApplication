import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import { Outlet } from "react-router-dom";

import WhatsNewModal from "../components/modals/whats-new/WhatsNewModal";

const initialSteps = [
  {
    content: (
      <div>
        <div className="font-bold text-[16px]">
          Lead creation - A newly added feature
        </div>
        <div className="mt-[5px]">
          Click the recruitment tab and start adding leads
        </div>
      </div>
    ),
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
    content: "Please click on leads tab",
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
    title: "Leads Page",
  },
  {
    content: "Start adding leads by clicking this button",
    placement: "right",
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
    target: ".add-leads-button",
    title: "Adding leads to your team",
  },
  {
    content: "Begin by adding the first name",
    placement: "bottom",
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    spotlightClicks: true,
    target: "#first-name-textfield",
    title: "First Name",
  },
  {
    content: "and then we add the last name",
    placement: "bottom",
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    spotlightClicks: true,
    target: "#last-name-textfield",
    title: "Last Name",
  },
  {
    content: "add the email address",
    placement: "bottom",
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    spotlightClicks: true,
    target: "#email-textfield",
    title: "Email Address",
  },
  {
    content: "and lastly adding the contact number",
    placement: "bottom",
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    spotlightClicks: true,
    target: "#contact-textfield",
    title: "Contact Number",
  },
  {
    content: "Click on this button to create your lead",
    placement: "top",
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    spotlightClicks: true,
    target: "#create-lead-button",
    title: "Contact Number",
  },
];

const DefaultLayout = ({ children }) => {
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
    if (run) {
      setState((prevState) => ({
        ...prevState,
        run: run,
        stepIndex: stepIndex + 1,
      }));

      setTimeout(() => {
        setState((prevState) => ({ ...prevState, run: true }));
      }, 400);
    }
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
      <div className="p-[20px] bg-[#fbfbfb]">
        <Outlet context={{ handleClickOpen, setJoyride: setState }} />
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
    </div>
  );
};

export default DefaultLayout;
