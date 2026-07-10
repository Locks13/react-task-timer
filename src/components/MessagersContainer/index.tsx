import { Bounce, ToastContainer } from "react-toastify";

type MessageConteinerPros = {
  children: React.ReactNode;
};
export function MessagersContainer({ children }: MessageConteinerPros) {
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
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
