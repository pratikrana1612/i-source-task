export async function fetchData(url) {
  console.log(url);
  const response = await fetch(url);

  if (!response.ok) {
    // ...
  } else {
    const resData = await response.json();
    // console.table(resData);
    // console.log(resData);
    return resData;
  }
}
