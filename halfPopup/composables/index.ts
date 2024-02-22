export const testtest = async () => {
  const { $useApiFetch } = useNuxtApp();



  function getParams(obj) {
    const params = new URLSearchParams();
    for(let key in obj) {
        params.append(key, obj[key])
    }

    return params;
  }

  const params = {
    nickName: 123,
    eventCk: true,
  }

  const data = await $useApiFetch(`user/modify/change`, {
    method:'POST',
    credentials: 'include',
    body: getParams(params)
  });

  console.log('응답', data);

  return data;
}