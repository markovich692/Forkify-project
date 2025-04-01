export const getJSON = async function (url, id) {
  try {
    const res = await fetch(`${url}/${id}`);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (error) {
    alert(error);
  }
};
