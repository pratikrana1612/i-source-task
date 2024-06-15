import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import UserForm from "../components/UserForm";
import { fetchData } from "../../util/fetcher";
import ErrorMessage from "../components/small/ErrorMesssage";
function getRandomDecimal() {
  return Math.random();
}
// This component is used to edit user details. It renders a form to edit user details.
// It also handles errors returned by the server.
export default function EditUser() {
  // Get action data from the server
  let actionData = useActionData();
  // Get user data from the server
  const user = useLoaderData();
  return (
    <>
      <h1 className="text-3xl font-[sans-serif] text-center my-4">Edit User</h1>
      {/* Render any error messages returned by the server */}
      {actionData && actionData.errors.length > 0 && (
        <ErrorMessage key={getRandomDecimal()}>
          {actionData.errors[0].msg}
        </ErrorMessage>
      )}
      {/* Render the user form */}
      <Form
        className="max-w-md mx-auto space-y-4 font-[sans-serif] text-[#333] mt-4"
        method="post"
        encType="multipart/form-data"
      >
        <UserForm user={user}></UserForm>
      </Form>
    </>
  );
}

// This function is used to fetch user data from the server before rendering the EditUser component.
// It takes the user id as a parameter and returns the user data.
export async function loader({ params }) {
  return fetchData("http://localhost:8081/api/users/user/" + params.userId);
}

// This function is used to handle form submission for the EditUser component.
// It sends a PUT request to the server with the form data and redirects to the home page if successful.
export async function action({ params, request }) {
  // Get the form data from the request
  const formData = await request.formData();
  // If the password field is not present, delete the password field from the form data
  if (!formData.get("password")) {
    formData.delete("password");
  }
  // let user = Object.fromEntries(formData);
  // Send a PUT request to the server with the form data
  const response = await fetch(
    "http://localhost:8081/api/users/user/" + params.userId,
    {
      method: "PUT",
      body: formData,
    }
  );
  // If the request is not successful, do nothing
  if (!response.ok) {
    // return redirect(redirectHelper("/students/add-student?error=true"));
  }
  // If the request is successful, redirect to the home page
  return redirect("/");
}
