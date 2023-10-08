import "./index.css";
import { useState, Fragment, useEffect, useReducer, useCallback } from "react";
import Box from "../../component/box";
import PostContent from "../../component/post-content";
import Grid from "../../component/grid";
import PostCreate from "../post-create";
import { Alert, Sceleton, LOAD_STATUS } from "../../component/load";

import { getDate } from "../../util/getDate";

import {
   requestInitialState,
   requestReducer,
   REQUEST_ACTION_TYPE,
} from "../../util/request";

export default function Container({ id, username, text, date }) {
   // const [data, setData] = useState({id,
   // username,
   // text,
   // date,
   // reply: null,});

   // const [status, setStatus] = useState(null);
   // const [message, setMessage] = useState("");

   const [state, dispach] = useReducer(
      requestReducer,
      requestInitialState,
      (state) => ({ ...state, data: { id, username, text, date, reply: null } })
   );
   const getData = useCallback(async () => {
      try {
         dispach({ type: REQUEST_ACTION_TYPE.PROGRESS });
         const res = await fetch(
            `http://localhost:4000/post-item?id=${state.data.id}`
         );

         const resData = await res.json();

         if (res.ok) {
            dispach({
               type: REQUEST_ACTION_TYPE.SUCCESS,
               payload: convertData(resData),
            });
         } else {
            dispach({
               type: REQUEST_ACTION_TYPE.ERROR,
               payload: resData.message,
            });
         }

         // ===
      } catch (error) {
         dispach({
            type: REQUEST_ACTION_TYPE.ERROR,
            payload: error.message,
         });
      }
   }, [state.data.id]);

   const convertData = ({ post }) => ({
      id: post.id,
      username: post.username,
      text: post.text,
      date: getDate(post.date),

      reply: post.reply.reverse().map(({ id, username, text, date }) => ({
         id,
         username,
         text,
         date: getDate(date),
      })),
      isEmpty: post.reply.length === 0,
   });

   const [isOpen, setOpen] = useState(false);

   const handleOpen = () => {
      // if (status === null) {
      //    getData();
      // }
      setOpen(!isOpen);
   };

   useEffect(() => {
      if (isOpen === true) {
         getData();
      }
   }, [isOpen]);

   return (
      <Box style={{ padding: "0" }}>
         <div
            onClick={handleOpen}
            style={{
               padding: "20px",
               cursor: "pointer",
            }}
         >
            <PostContent
               username={state.data.username}
               date={state.data.date}
               text={state.data.text}
            />
         </div>

         {isOpen && (
            <div style={{ padding: "0 20px 20px 20px" }}>
               <Grid>
                  <Box>
                     <PostCreate
                        placeholder="Post your reply"
                        button="reply"
                        id={state.data.id}
                        onCreate={getData}
                     />
                  </Box>
                  {state.status === REQUEST_ACTION_TYPE.PROGRESS && (
                     <Fragment>
                        <Box>
                           <Sceleton />
                        </Box>
                        <Box>
                           <Sceleton />
                        </Box>
                     </Fragment>
                  )}

                  {state.status === REQUEST_ACTION_TYPE.ERROR && (
                     <Alert status={state.status} message={state.message} />
                  )}

                  {state.status === REQUEST_ACTION_TYPE.SUCCESS &&
                     state.data.isEmpty === false &&
                     state.data.reply.map((item) => (
                        <Fragment key={item.id}>
                           <PostContent {...item} />
                        </Fragment>
                     ))}
               </Grid>
            </div>
         )}
      </Box>
   );
}
