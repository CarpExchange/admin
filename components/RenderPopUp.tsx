import React, { FC, useContext } from "react";
import { Collapsible } from "./ui/collapsible";
import { Alert } from "./ui/alert";
import { NotificationContext } from "./NotificationProvider";
import { X } from "lucide-react";

const RenderPopUp: FC = () => {
  const { state: notificationPopUp, dispatch: setNotificationPopUp } =
    useContext(NotificationContext);

  return (
    <Collapsible open={notificationPopUp.status}>
      <Alert variant={notificationPopUp.type}>
        <div className="flex items-center justify-between">
          <p>{notificationPopUp.message}</p>
          <button
            onClick={() =>
              setNotificationPopUp({
                type: "UPDATE_MESSAGE",
                payload: {
                  status: false,
                  message: "",
                  type: "",
                },
              })
            }
          >
            <X color="#1f2937" size={20} />
          </button>
        </div>
      </Alert>
    </Collapsible>
  );
};

export default RenderPopUp;
