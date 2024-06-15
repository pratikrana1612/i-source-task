import UserRow from "../components/UserRow";
import { fetchData } from "../../util/fetcher";
import {
  Link,
  json,
  redirect,
  useLoaderData,
  useSubmit,
} from "react-router-dom";

const headings = [
  "Profile Pic",
  "Name",
  "Email",
  "Username",
  "Contact",
  "Actions",
];
export default function MainPage() {
  const submit = useSubmit();
  const users = useLoaderData();
  function startDeleteHandler(event, id) {
    event.preventDefault();
    const proceed = window.confirm("Are you sure?");
    console.log(id);

    if (proceed) {
      submit(
        { _id: id },
        {
          method: "delete",
          encType: "application/json",
        }
      );
    }
  }
  return (
    <>
      <div className="w-screen flex justify-center items-center my-4">
        <Link to="/add-user">
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-current outline-none bg-black hover:bg-transparent text-white hover:text-black transition-all duration-300"
          >
            Add User
          </button>
        </Link>
      </div>
      <div className="w-screen flex justify-center items-center px-5">
        <div className="font-[sans-serif] overflow-x-auto w-screen">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 whitespace-nowrap">
              <tr>
                {headings.map((heading) => (
                  <th
                    key={heading}
                    className="p-4 text-left text-sm font-medium text-white"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="whitespace-nowrap">
              {users.length > 0 &&
                users.map((user) => (
                  <UserRow
                    key={user._id}
                    {...user}
                    startDeleteHandler={startDeleteHandler}
                  />
                ))}
            </tbody>
          </table>
          {users.length <= 0 && (
            <p className="p-4 text-lg text-black font-bold text-center">
              No users found
            </p>
          )}
        </div>
      </div>
    </>
  );
}
export async function loader() {
  return fetchData("http://localhost:8081/api/users");
}
export async function action({ request }) {
  const data = await request.json();
  // console.log(params.studentId);
  const response = await fetch(
    "http://localhost:8081/api/users/user/" + data._id,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw json(
      { message: "Could not delete stu." },
      {
        status: 500,
      }
    );
  }
  return redirect("/");
  // return redirect("/students");
}
