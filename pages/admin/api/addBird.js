const base = "";

const addBird = async (data) => {
  let response = await fetch("/api/admin/bird", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
}

const addBirdPhotoFiles = async (formData, birdId) => {
  // для formData не нужно вручную указывать заголовок Content-Type
  await fetch(`/api/admin/bird/${birdId}/photos`, {
    method: "POST",
    body: formData
  })
}