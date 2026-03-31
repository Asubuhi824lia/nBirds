const base = "";

const headersJSON = new Headers({
  'Content-Type': 'application/json;charset=utf-8'
})

const addBird = async (data) => {
  const req = new Request("/api/admin/bird", {
    method: "POST",
    headers: headersJSON,
    body: JSON.stringify(data)
  })

  let response = await fetch(req);
}

const addBirdPhotoFiles = async (formData, birdId) => {
  // для formData не нужно вручную указывать заголовок Content-Type
  await fetch(`/api/admin/bird/${birdId}/photos`, {
    method: "POST",
    body: formData
  })
}