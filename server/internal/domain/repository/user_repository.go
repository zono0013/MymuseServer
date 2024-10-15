package repository

import (
	"context"
	"github.com/zono0013/MyMuseGolangAPI/internal/domain/model"
)

type UserRepository interface {
	FindByEmail(ctx context.Context, email string) (*model.User, error)
	Create(ctx context.Context, user *model.User) error
	Update(ctx context.Context, user *model.User) error
}
