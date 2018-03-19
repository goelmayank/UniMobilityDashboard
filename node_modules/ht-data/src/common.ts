export const CommonFunctions = {
  setEntityCountMap: (entity = {}, entityCountMap = {}, uniqueProp = "id") => {
    let newEntityMap = { ...entityCountMap };
    let type = entity[uniqueProp] + "-count";
    let id = entity["id"];
    let typeCount = entityCountMap[type];
    let actionShort = entityCountMap[id];
    if (typeCount) {
      if (!actionShort) {
        newEntityMap[type] = entityCountMap[type] + 1;
        newEntityMap[id] = "" + entityCountMap[type];
      }
    } else {
      newEntityMap[type] = 1;
      newEntityMap[id] = "";
    }
    // console.log(actionMap, "map");
    return newEntityMap;
  }
};
