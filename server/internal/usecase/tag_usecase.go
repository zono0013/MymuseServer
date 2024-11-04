package usecase

import (
	"context"
	"fmt"
	"github.com/zono0013/MyMuseGolangAPI/internal/domain/model"
	"github.com/zono0013/MyMuseGolangAPI/internal/domain/repository"
	"github.com/zono0013/MyMuseGolangAPI/internal/usecase/input"
)

type tagUsecase struct {
	repository.TagRepository
	repository.UserRepository
}

type ITagUsecase interface {
	Create(ctx context.Context, tag input.CreateTagInput) error
	Update(ctx context.Context, tag input.UpdateTagInput) error
	Delete(ctx context.Context, tag_id string) error
}

func NewTagUsecase(tagRepository repository.TagRepository, userRepository repository.UserRepository) ITagUsecase {
	return &tagUsecase{
		tagRepository,
		userRepository,
	}
}

func (t tagUsecase) Create(ctx context.Context, input input.CreateTagInput) error {
	fmt.Printf("user: %s, tagname: %s, order: %d\n", input.UserID, input.Name, input.Order)

	_, err := t.FindByID(ctx, input.UserID)
	if err != nil {
		fmt.Println("UserID not found")
		return err
	}

	return t.TagRepository.Create(ctx, model.NewCreateTag(input.Name, input.UserID, input.Order))
}

func (t tagUsecase) Update(ctx context.Context, input input.UpdateTagInput) error {
	var tag *model.Tag
	tag = &model.Tag{
		ID:     input.ID,
		Name:   input.Name,
		UserID: input.UserID,
		Order:  input.Order,
	}
	return t.TagRepository.Update(ctx, tag)
}

func (t tagUsecase) Delete(ctx context.Context, tag_id string) error {
	return t.TagRepository.Delete(ctx, tag_id)
}
