package output

type UserTagsPhotosResponse struct {
	Tags []TagsPhotosResponse `json:"tags"`
}

type TagsPhotosResponse struct {
	ID     uint          `json:"ID"`
	Name   string        `json:"name"`
	Photos []PhotoOutput `json:"photos"`
}