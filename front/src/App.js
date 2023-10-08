import {
   useState,
   useEffect,
   useReducer,
   useRef,
   useMemo,
   useCallback,
   memo,
   lazy,
   Suspense,
   createContext,
} from "react";
import Page from "./component/page";
import PostList from "./container/post-list";
import useWindowListener from "./util/useWindowListener";
import Title from "./component/title";
import Box from "./component/box";
import Grid from "./component/grid";

// function App() {}

export const THEME_TYPE = {
   LIGHT: "light",
   DARK: "dark",
};

export const ThemeContext = createContext(null);

const THEME_ACTION_TYPE = {
   TOOGLE: "toogle",
};

const themeReducer = (state, action) => {
   switch (action.type) {
      case THEME_ACTION_TYPE.TOOGLE:
         return state === THEME_TYPE.DARK ? THEME_TYPE.LIGHT : THEME_TYPE.DARK;

      default:
         return state;
   }
};

function App() {
   // const [currentTheme, setTheme] = useState(THEME_TYPE.LIGHT);

   const [currentTheme, dispatch] = useReducer(themeReducer, THEME_TYPE.DARK);

   // const handleChangeTheme = () => {
   //    setTheme((prevTheme) => {
   //       if (prevTheme === THEME_TYPE.LIGHT) {
   //          return THEME_TYPE.DARK;
   //       } else {
   //          return THEME_TYPE.LIGHT;
   //       }
   //    });
   // };

   const theme = useMemo(
      () => ({
         theme: currentTheme,
         toggle: () => dispatch({ type: THEME_ACTION_TYPE.TOOGLE }),
      }),
      [currentTheme]
   );

   return (
      <Page>
         <ThemeContext.Provider value={theme}>
            <PostList />
         </ThemeContext.Provider>
      </Page>
   );
}

export default App;

//====================================================
// const Child = memo(
//    ({ value }) => {
//       console.log("child render", value);

//       return <div>{value}</div>;
//    },
//    (prev, next) => {
//       // console.log(prev, next);

//       return next.value % 5 !== 0;
//    }
// );

// const Child = lazy(() => import("./child"));

// function App() {
//    const [value, setvalue] = useState(0);

//    useEffect(() => {
//       const id = setInterval(() => setvalue((prev) => prev + 1), 1000);
//       return () => {
//          clearInterval(id);
//       };
//    }, []);

//    return (
//       <Page>
//          <div>state: {value}</div>
//          {value > 5 && (
//             <Suspense fallback={<div>Loading...</div>}>
//                <Child value={value} />
//             </Suspense>
//          )}
//       </Page>
//    );
// }
//====================================================
// function Child({ state }) {
//    console.log("render");
//    // const handleClick = () => alert("memmo");
//    // const data = useMemo(() => {
//    //    return Math.random() + Math.random();
//    // }, []);
//    // // const data = Math.random() + Math.random(); //+ console.log("Text");
//    const handleClick = useCallback(() => alert(state), [state]);

//    useEffect(() => {
//       console.log("new handleCleck");
//    }, [handleClick]);
//    return <div onClick={handleClick}>Child </div>;
// }

// function App() {
//    const [state, setState] = useState(0);
//    const [state2, setState2] = useState(0);

//    useEffect(() => {
//       const id = setInterval(() => setState((prev) => prev + 1), 1000);
//       const id2 = setInterval(() => setState2((prev) => prev + 1), 5000);
//       return () => {
//          clearInterval(id);
//          clearInterval(id2);
//       };
//    }, []);

//    return (
//       <Page>
//          Hello {state} <Child state={state2} />
//       </Page>
//    );
// }

//====================Lections================================
// function App() {
//    // const [position, setPosition] = useState({ x: 0, y: 0 });
//    // function handleMove(e) {
//    //    setPosition({ x: e.clientX, y: e.clientY });
//    // }

//    // useWindowListener("pointermove", handleMove);

//    // const [location, setLocation] = useState(null);

//    // useState(() => {
//    //    if ("geolocation" in navigator) {
//    //       navigator.geolocation.getCurrentPosition(
//    //          (position) => {
//    //             const { latitude, longitude } = position.coords;
//    //             setLocation({ latitude, longitude });
//    //          },
//    //          (error) => {
//    //             console.error("Помилка отримання геолокації", error.message);
//    //          }
//    //       );
//    //    } else {
//    //       console.error("Геолокація не підтримується в цьому браузері");
//    //    }
//    // }, []);

//    return (
//       <Page>
//          {/* {location ? (
//             <div>
//                <h2>Ваша геолокація</h2>
//                <p>Широта: {location.latitude}</p>
//                <p>Довгота: {location.longitude}</p>
//             </div>
//          ) : (
//             <div>Отримання геолокації....</div>
//          )} */}
//          <PostList />
//          {/* <PostList />
//          <div
//             style={{
//                position: "absolute",
//                backgroundColor: "red",
//                borderRadius: "50%",
//                opacity: 0.7,
//                transform: `translate(${position.x}px, ${position.y}px)`,
//                pointerEvents: "none",
//                left: -20,
//                top: -20,
//                width: 40,
//                height: 40,
//             }}
//          ></div> */}
//       </Page>
//    );
// }
//====================================================
// const LIST_ACTION_TYPE = {
//    ADD: "add",
//    DELETE: "delete",
//    SELECT: "select",
//    REVERSE: "reverse",
// };

// function listreducer(state, action) {
//    switch (action.type) {
//       case LIST_ACTION_TYPE.ADD:
//          const id = new Date().getTime();

//          const newItem = { value: action.payload, id };
//          return {
//             ...state,
//             items: [...state.items, newItem],
//          };

//       case LIST_ACTION_TYPE.DELETE:
//          let newItems = state.items.filter(
//             (item) => item.id !== action.payload
//          );
//          return { ...state, items: newItems };

//       case LIST_ACTION_TYPE.SELECT:
//          return {
//             ...state,
//             selectedId:
//                action.payload === state.selectedId ? null : action.payload,
//          };
//       case LIST_ACTION_TYPE.REVERSE:
//          return {
//             ...state,
//             items: state.items.reverse(),
//          };
//       default:
//          return { ...state };
//    }
// }

// const initState = { items: [] };

// function App() {
//    const init = (state) => {
//       if (state.items && state.items.length === 0) {
//          return {
//             ...state,
//             items: [...state.items, { id: 432312, value: "default item" }],
//          };
//       } else return state;
//    };
//    const [state, dispach] = useReducer(listreducer, initState, init);

//    const handleAddItem = (e) => {
//       // console.log(e.target.value);
//       const { value } = e.target;
//       if (value.trim() === "") return null;

//       dispach({ payload: value, type: LIST_ACTION_TYPE.ADD });

//       e.target.value = "";
//    };

//    const handleRemoveItem = (id) => {
//       dispach({ payload: id, type: LIST_ACTION_TYPE.DELETE });
//    };

//    const handleSelectItem = (id) => {
//       dispach({ payload: id, type: LIST_ACTION_TYPE.SELECT });
//    };

//    const handleReverse = () => {
//       dispach({ type: LIST_ACTION_TYPE.REVERSE });
//    };
//    return (
//       <Page>
//          <Grid>
//             <Box>
//                <Grid>
//                   <h1>Список елементів</h1>
//                   <ul>
//                      <Grid>
//                         {state.items.map(({ value, id }) => (
//                            <li onClick={() => handleSelectItem(id)} key={id}>
//                               <Box
//                                  style={{
//                                     borderColor:
//                                        state.selectedId === id
//                                           ? "blue"
//                                           : "#e6e6e6",
//                                  }}
//                               >
//                                  <Grid>
//                                     <span> {value}</span>
//                                     <button
//                                        onClick={(e) => {
//                                           e.stopPropagation();
//                                           handleRemoveItem(id);
//                                        }}
//                                        style={{
//                                           border: "1px solid red",
//                                        }}
//                                     >
//                                        Delete
//                                     </button>
//                                  </Grid>
//                               </Box>
//                            </li>
//                         ))}
//                      </Grid>
//                   </ul>
//                </Grid>
//             </Box>
//             <Box>
//                <input
//                   onBlur={handleAddItem}
//                   type="text"
//                   placeholder="input new element"
//                />
//             </Box>
//             <Box>
//                <button
//                   onClick={handleReverse}
//                   style={{
//                      border: "1px solid red",
//                   }}
//                >
//                   REVERSE
//                </button>
//             </Box>
//          </Grid>
//       </Page>
//    );
// }
//====================================================
// function App() {
//    const firstRef = useRef(null);
//    const secondRef = useRef(null);
//    const thirdRef = useRef(null);
//    const headerRef = useRef(null);

//    function handleScrollBy(ref) {
//       if (ref && ref.current) {
//          const offsetTop = ref.current.offsetTop;
//          window.scrollTo({
//             top: offsetTop,
//             behavior: "smooth",
//          });
//       }
//    }

//    return (
//       <Page>
//          <Grid>
//             <div id="header" ref={headerRef}>
//                Header
//             </div>
//             <button onClick={() => handleScrollBy(firstRef)}>First</button>
//             <button onClick={() => handleScrollBy(secondRef)}>Second</button>
//             <button onClick={() => handleScrollBy(thirdRef)}>Third</button>
//          </Grid>
//          <div>
//             <ul
//                style={{ display: "grid", gap: "500px", marginBottom: "500px" }}
//             >
//                <li>
//                   <img
//                      src="https://picsum.photos/200/300"
//                      alt=""
//                      ref={firstRef}
//                   />
//                </li>
//                <li>
//                   <img
//                      src="https://picsum.photos/200/300"
//                      alt=""
//                      ref={secondRef}
//                   />
//                </li>
//                <li>
//                   <img
//                      src="https://picsum.photos/200/300"
//                      alt=""
//                      ref={thirdRef}
//                   />
//                </li>
//             </ul>
//          </div>
//          <button
//             onClick={() => handleScrollBy(headerRef)}
//             style={{ position: "fixed", bottom: "50px", left: "50px" }}
//          >
//             To top
//          </button>
//       </Page>
//    );
// }
//====================================================
// function App() {
//    const inputRef = useRef(null);

//    useEffect(() => {
//       if (inputRef && inputRef.current) {
//          inputRef.current.focus();
//       }
//    }, []);

//    return (
//       <Page>
//          <Grid>
//             <Box>
//                <input ref={inputRef} placeholder="input email" />
//             </Box>
//             <Box>
//                <input placeholder="input password" />
//             </Box>
//          </Grid>
//       </Page>
//    );
// }
//====================================================
// function App() {
//    const prevValueRef = useRef("null");

//    const [value, setValue] = useState(0);

//    useEffect(() => {
//       console.log(value, "value");
//       console.log(prevValueRef, "prevValueRef");

//       prevValueRef.current = value;
//    }, [value]);

//    const handleIncrement = () => {
//       setValue(value + 1);
//    };

//    return (
//       <Page>
//          <Grid>
//             <Box>
//                <p>Current value: {value}</p>
//                <p>Previous value: {prevValueRef.current}</p>
//             </Box>
//             <Box>
//                <button onClick={handleIncrement}>Increment</button>
//             </Box>
//          </Grid>
//       </Page>
//    );
// }
//====================================================
// function App() {
//    const scrollPositionRef = useRef(0);

//    const handleScroll = () => {
//       console.log(scrollPositionRef);
//       scrollPositionRef.current = window.scrollY;
//    };

//    useEffect(() => {
//       window.addEventListener("scroll", handleScroll);
//       return () => {
//          window.removeEventListener("scroll", handleScroll);
//       };
//    }, []);

//    useEffect(() => {
//       console.log("scrollPositionRef", scrollPositionRef);
//    }, [scrollPositionRef.current]);

//    return (
//       <Page>
//          <p style={{ height: 10000 }}></p>
//       </Page>
//    );
// }
