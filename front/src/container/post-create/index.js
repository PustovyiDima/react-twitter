import "./index.css";

import FieldForm from "../../component/field-form";
import Grid from "../../component/grid";
import { useState, useReducer, memo, useCallback } from "react";

import { Alert, Loader, LOAD_STATUS } from "../../component/load";

import {
   requestInitialState,
   requestReducer,
   REQUEST_ACTION_TYPE,
} from "../../util/request";

function Container({ onCreate, placeholder, button, id = null }) {
   // const [status, setStatus] = useState(null);
   // const [message, setMessage] = useState("");
   const [state, dispach] = useReducer(requestReducer, requestInitialState);

   const convertData = useCallback(
      ({ value }) =>
         JSON.stringify({ text: value, username: "user", postId: id }),
      [id]
   );

   const sendData = useCallback(
      async (dataToSend) => {
         dispach({ type: REQUEST_ACTION_TYPE.PROGRESS });
         try {
            const res = await fetch("http://localhost:4000/post-create", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: convertData(dataToSend),
            });

            const data = await res.json();

            if (res.ok) {
               dispach({ type: REQUEST_ACTION_TYPE.RESET });

               if (onCreate) onCreate();
            } else {
               dispach({
                  type: REQUEST_ACTION_TYPE.ERROR,
                  message: data.message,
               });
            }
         } catch (error) {
            dispach({
               type: REQUEST_ACTION_TYPE.ERROR,
               message: error.message,
            });
         }
      },
      [convertData, onCreate]
   );

   const handleSubmit = useCallback(
      (value) => {
         return sendData({ value });
      },
      [sendData]
   );

   // ===
   // console.log("render");

   return (
      <Grid>
         <FieldForm
            placeholder={placeholder}
            button={button}
            onSubmit={handleSubmit}
         />
         {state.status === REQUEST_ACTION_TYPE.ERROR && (
            <Alert status={state.status} message={state.message} />
         )}
         {state.status === REQUEST_ACTION_TYPE.PROGRESS && <Loader />}
      </Grid>
   );
}

export default memo(Container, (prev, next) => {
   // console.log(prev, next);

   return true;
});
