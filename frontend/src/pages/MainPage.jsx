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
// MainPage component is the main page of the application. It renders a table
// of users and allows to add new users. It uses the useSubmit and useLoaderData
// hooks from react-router-dom to handle form submission and data loading.
export default function MainPage() {
  // useSubmit hook is used to submit form data to the server. It returns a
  // function that can be called with the form data and additional options.
  const submit = useSubmit();

  // useLoaderData hook is used to load data from the server. It returns the
  // data loaded from the server.
  const users = useLoaderData();

  // startDeleteHandler is a function that is called when the delete button in
  // the user row is clicked. It prompts the user for confirmation and if
  // confirmed, submits a delete request to the server.
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
      {/* Link component is used to create a link to another page. In this case,
          it creates a link to the add-user page. */}
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

      {/* The main table of users is rendered here. If there are users, a table
          is rendered with the users data. If there are no users, a message is
          displayed. */}
      <div className="w-screen flex justify-center items-center px-5">
        <div className="font-[sans-serif] overflow-x-auto w-screen">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 whitespace-nowrap">
              <tr>
                {/* The headings of the table are rendered here. */}
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
              {/* If there are users, a UserRow component is rendered for each
                  user. The UserRow component receives the user data and the
                  startDeleteHandler function as props. */}
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
          {/* If there are no users, a message is displayed. */}
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

// loader function is used to load data from the server. It returns the data
// loaded from the server.
export async function loader() {
  return fetchData("http://localhost:8081/api/users");
}

// action function is used to handle form submission. It receives the request
// object and extracts the form data from it. It then submits a delete request
// to the server and redirects to the main page if the request is successful.
export async function action({ request }) {
  const data = await request.json();
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
}
