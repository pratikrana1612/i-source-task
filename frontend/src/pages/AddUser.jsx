import { Form, redirect, useActionData } from "react-router-dom";
import UserForm from "../components/UserForm";
import ErrorMessage from "../components/small/ErrorMesssage";
import { useEffect, useState } from "react";
export default function AddUser() {
  let actionData = useActionData();
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    if (actionData && actionData.errors.length > 0) {
      setShowError(true);
    }
  }, [actionData]);
  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <>
      <h1 className="text-3xl font-[sans-serif] text-center my-4">Add User</h1>
      {showError && actionData && actionData.errors.length > 0 && (
        <ErrorMessage onClose={handleCloseError}>
          {actionData.errors[0].msg}
        </ErrorMessage>
      )}
      <Form
        className="max-w-md mx-auto space-y-4 font-[sans-serif] text-[#333] mt-4"
        method="post"
        encType="multipart/form-data"
      >
        <UserForm></UserForm>
      </Form>
    </>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  //   let user = Object.fromEntries(formData);

  const response = await fetch("http://localhost:8081/api/users/user", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify(student),
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
    // return redirect(redirectHelper("/students/add-student?error=true"));
  }

  return redirect("/");
}
