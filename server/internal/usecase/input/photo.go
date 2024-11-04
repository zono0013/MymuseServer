package input

type CreatePhotoInput struct {
	Title         string
	DetailedTitle string `json:"detailed_title"`
	Content       string
	Height        int
	Width         int
	Order         int
	TagID         uint `json:"tag_id"`
}

type UpdatePhotoInput struct {
	ID            uint   `json:"id"`
	Title         string `json:"title"`
	DetailedTitle string `json:"detailed_title"`
}
