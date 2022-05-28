
export const fetchHook = async (url: string) => {
  let loading = false;
  let error = "";
  let payload = null;

  try {
    loading = true;
    const response = await fetch(url);
    if(response.ok){
      payload = await response.json();
    } else {
      error = "Error when fetching posts"
    }
  } catch (err: any) {
    error = JSON.stringify(err);
  } finally {
    loading = false;
  }

  return {
    loading,
    error,
    payload
  }

}