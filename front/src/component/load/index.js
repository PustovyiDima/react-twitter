import "./index.css";

export const LOAD_STATUS = {
   PROGRESS: "progress",
   SUCCESS: "success",
   ERROR: "error",
};

export function Alert({ message, status = "default" }) {
   return <div className={`alert alert--${status}`}>{message}</div>;
}

export function Loader() {
   return <div className="loader"></div>;
}

export function Sceleton() {
   return (
      <div className="sceleton">
         <div className="sceleton__item"></div>
         <div className="sceleton__item"></div>
         <div className="sceleton__item"></div>
      </div>
   );
}
