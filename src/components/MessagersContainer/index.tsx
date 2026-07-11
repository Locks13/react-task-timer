import { useContext } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { TaskContext } from "../../contexts/TaskContext/TaskContext";

type MessageConteinerPros = {
  children: React.ReactNode;
};
export function MessagersContainer({ children }: MessageConteinerPros) {
  const context = useContext(TaskContext);

  // Se não estiver no contexto, usa fallback light
  const toastTheme = context?.getToastTheme ? context.getToastTheme() : "light";
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={toastTheme}
        transition={Bounce}
      />
    </>
  );
}
