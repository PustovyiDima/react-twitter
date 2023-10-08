import Title from "../../component/title";
import Box from "../../component/box";
import Grid from "../../component/grid";
// import PostItem from "../post-item";

import PostCreate from "../post-create";
import {
   useState,
   Fragment,
   useEffect,
   useReducer,
   lazy,
   Suspense,
   useCallback,
} from "react";

import { Alert, Sceleton, LOAD_STATUS } from "../../component/load";

import { getDate } from "../../util/getDate";

import {
   requestInitialState,
   requestReducer,
   REQUEST_ACTION_TYPE,
} from "../../util/request";

const PostItem = lazy(() => import("../post-item"));

export default function Container() {
   // const [status, setStatus] = useState(null);
   // const [message, setMessage] = useState("");
   // const [data, setData] = useState(null);

   const [state, dispach] = useReducer(requestReducer, requestInitialState);

   const getData = useCallback(async () => {
      dispach({ type: REQUEST_ACTION_TYPE.PROGRESS });
      try {
         // setStatus(LOAD_STATUS.PROGRESS);
         const res = await fetch("http://localhost:4000/post-list", {
            method: "GET",
         });

         const data = await res.json();

         if (res.ok) {
            dispach({
               type: REQUEST_ACTION_TYPE.SUCCESS,
               payload: convertData(data),
            });
         } else {
            dispach({
               type: REQUEST_ACTION_TYPE.ERROR,
               payload: data.message,
            });
         }

         // ===
      } catch (error) {
         dispach({
            type: REQUEST_ACTION_TYPE.ERROR,
            payload: error.message,
         });
      }
   }, []);

   const convertData = (raw) => ({
      list: raw.list.reverse().map(({ id, username, text, date }) => ({
         id,
         username,
         text,
         date: getDate(date),
      })),
      isEmpty: raw.list.length === 0,
   });

   // if (status === null) {
   //    getData();
   // }
   useEffect(() => {
      getData();
   }, []);

   return (
      <Grid>
         <Box>
            <Grid>
               <Title>Home</Title>
               <PostCreate
                  onCreate={getData}
                  placeholder="What is happening?!"
                  button="Post"
               />
            </Grid>
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

         {state.status === REQUEST_ACTION_TYPE.SUCCESS && (
            <Fragment>
               {state.data.isEmpty ? (
                  <Alert message="Список постів пустий" />
               ) : (
                  state.data.list.map((item) => (
                     <Fragment key={item.id}>
                        <Suspense
                           fallback={
                              <Box>
                                 <Sceleton />
                              </Box>
                           }
                        >
                           <PostItem {...item} />
                        </Suspense>
                     </Fragment>
                  ))
               )}
            </Fragment>
         )}
      </Grid>
   );
}
