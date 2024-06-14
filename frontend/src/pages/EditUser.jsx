import { Form, redirect, useLoaderData } from "react-router-dom";
import UserForm from "../components/UserForm";
import { fetchData } from "../../util/fetcher";
export default function EditUser() {
  const user = useLoaderData();
  return (
    <>
      <h1 className="text-3xl font-[sans-serif] text-center my-4">Edit User</h1>
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
export async function loader({ params }) {
  return fetchData("http://localhost:8081/api/users/user/" + params.userId);
}
export async function action({ params, request }) {
  const formData = await request.formData();
  //   let user = Object.fromEntries(formData);

  const response = await fetch(
    "http://localhost:8081/api/users/user/" + params.userId,
    {
      method: "PUT",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify(student),
      body: formData,
    }
  );

  if (!response.ok) {
    // return redirect(redirectHelper("/students/add-student?error=true"));
  }

  return redirect("/");
}