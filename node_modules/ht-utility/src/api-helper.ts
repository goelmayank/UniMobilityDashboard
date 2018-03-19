export const AuthLessReqOptions = () => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: null
  };
  let options = { headers: headers };
  return options;
};
