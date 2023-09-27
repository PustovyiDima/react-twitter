import "./index.css";
import { useState, Fragment } from "react";
import Box from "../../component/box";
import PostContent from "../../component/post-content";
import Grid from "../../component/grid";
import PostCreate from "../post-create";
import { Alert, Sceleton, LOAD_STATUS } from "../../component/load";

import { getDate } from "../../util/getDate";

export default function Container({ id, username, text, date }) {
   const [data, setData] = useState({
      id,
      username,
      text,
      date,
      reply: null,
   });

   const [status, setStatus] = useState(null);
   const [message, setMessage] = useState("");

   const getData = async () => {
      try {
         setStatus(LOAD_STATUS.PROGRESS);
         const res = await fetch(
            `http://localhost:4000/post-item?id=${data.id}`
         );

         const resData = await res.json();

         if (res.ok) {
            setData(convertData(resData));
            setStatus(LOAD_STATUS.SUCCESS);
         } else {
            setMessage(resData.message);
            setStatus(LOAD_STATUS.ERROR);
         }

         // ===
      } catch (error) {
         setMessage(error.message);
         setStatus(LOAD_STATUS.ERROR);
      }
   };

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
      if (status === null) {
         getData();
      }
      setOpen(!isOpen);
   };

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
               username={data.username}
               date={data.date}
               text={data.text}
            />
         </div>

         {isOpen && (
            <div style={{ padding: "0 20px 20px 20px" }}>
               <Grid>
                  <Box>
                     <PostCreate
                        placeholder="Post your reply"
                        button="reply"
                        id={data.id}
                        onCreate={getData}
                     />
                  </Box>
                  {status === LOAD_STATUS.PROGRESS && (
                     <Fragment>
                        <Box>
                           <Sceleton />
                        </Box>
                        <Box>
                           <Sceleton />
                        </Box>
                     </Fragment>
                  )}

                  {status === LOAD_STATUS.ERROR && (
                     <Alert status={status} message={message} />
                  )}

                  {status === LOAD_STATUS.SUCCESS &&
                     data.isEmpty === false &&
                     data.reply.map((item) => (
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
