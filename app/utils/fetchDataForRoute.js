const defaultFetchData = () => Promise.resolve();

function fetchDataForRoute(routes) {
  let params = {};
  let fetchData;
  let name;
  routes.forEach((route) => {
    params = {
      ...params,
      ...route.match.params,
    };
    fetchData = route.route.fetchData;
    name = route.route.name;
  });
  return fetchData ? fetchData(params, name) : Promise.resolve();
}

export default fetchDataForRoute;
