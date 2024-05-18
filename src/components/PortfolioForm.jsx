
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
const PortfolioForm = ({ handleShowPopup }) => {
  const { token, getPortfolios } = useStateContext();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    try {
      const response = await axios.post("https://backend-production-ac54.up.railway.app/portfolio", values, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log("Form submitted:", response.data);
      resetForm();
      getPortfolios();
      handleShowPopup();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-20 z-40" onClick={() => handleShowPopup()} />
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-extrabold mb-8 text-center">Setup Your Portfolio</h3>
          <Formik
            initialValues={{ name: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.name.trim()) {
                errors.name = "Portfolio Name is required";
              }
              return errors;
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="name" className="text-xl font-normal mb-2 block">New Portfolio Name:</label>
                  <Field type="text" id="name" name="name" className="border border-gray-400 p-2 w-full rounded" />
                  <ErrorMessage name="name" component="div" className="text-red-500" />
                </div>
                <div className="flex justify-center items-center gap-4">
                  <button type="button" className="text-black border font-bold py-2 px-4 rounded-2xl" onClick={() => handleShowPopup()}>
                    Cancel
                  </button>
                  <button type="submit" disabled={isSubmitting} className="bg-black text-white font-bold py-2 px-4 rounded-2xl">
                    {isSubmitting ?"Loading..." : "Create Portfolio"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default PortfolioForm;

// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import axios from "axios";
// import { useStateContext } from "../contexts/ContextProvider";
// import { Loading } from "./loading/Loading";

// const PortfolioForm = ({ handleShowPopup }) => {
//   const { token, getPortfolios } = useStateContext();
//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     console.log(values);
//     try {
//       const response = await axios.post("https://backend-production-ac54.up.railway.app/portfolio", values, {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       });
//       console.log("Form submitted:", response.data);
//       resetForm();
//       getPortfolios();
//       handleShowPopup();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <div className="w-screen h-screen fixed inset-0 bg-black opacity-20 flex items-center content-center z-40 " onClick={() => handleShowPopup()} />
//       <div className="w-1/2 fixed inset-auto mx-auto p-12 bg-white rounded-2xl shadow-md opacity-100 z-50">
//         <Formik
//           initialValues={{ name: "" }}
//           validate={(values) => {
//             const errors = {};
//             if (!values.name.trim()) {
//               errors.name = "Portfolio Name is required";
//             }
//             return errors;
//           }}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <div className="flex flex-col ">
//                 <h3 className="text-3xl font-extrabold mb-8 ">Setup Your Portfolio</h3>
//                 <label htmlFor="name" className="text-xl font-normal mb-3">
//                   New Portfolio Name:
//                 </label>
//                 <Field type="text" id="name" name="name" className="border p-2" />
//                 <ErrorMessage name="name" component="div" className="text-red-500" />
//               </div>
//               <div className="flex content-center items-center gap-3 my-4">
//                 <button className="mt-4 text-black border font-bold py-2 px-4 rounded-2xl" onClick={() => handleShowPopup()}>
//                   Cancel
//                 </button>
//                 <button type="submit" disabled={isSubmitting} className="mt-4 bg-black text-white font-bold py-2 px-4 rounded-2xl">
//                   {isSubmitting ? "Loading..." : "Create Portfolio"}
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </>
//   );
// };

// export default PortfolioForm;
