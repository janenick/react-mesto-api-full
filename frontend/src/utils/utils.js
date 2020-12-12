export const renderLoading = (isLoading, btnSubmit, btnText) => {
  if (isLoading) {
    btnSubmit.innerText = btnText;
  }
  else {
    btnSubmit.innerText = btnText;
  }
}


export const renderError = (err) => {
  console.log(err);
}