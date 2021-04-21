const MakeDateList = () => {
  let dateList = Array<string>();

  for (let i = 0; i < 3; i++) {
    let currentDate = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000);
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    dateList.push(`${year}/${month}/${day}`);
  }

  return dateList;
};

export default MakeDateList;
