package template

import (
	"errors"
	"html/template"
	"path/filepath"
	"sync"
)

type Manager struct {
	templates map[string]*template.Template
	mutex     sync.RWMutex
}

func NewManager() *Manager {
	return &Manager{
		templates: make(map[string]*template.Template),
	}
}

func (m *Manager) Load() error {
	m.mutex.Lock()
	defer m.mutex.Unlock()

	templates := []string{
		"templates/index.html",
		"templates/success.html",
		// 他のテンプレート
	}

	for _, tmpl := range templates {
		// テンプレートのベース名を取得（パスを除いた部分）
		baseName := filepath.Base(tmpl)

		t, err := template.ParseFiles(baseName)
		if err != nil {
			return err
		}
		m.templates[tmpl] = t
	}

	return nil
}

func (m *Manager) Get(name string) (*template.Template, error) {
	m.mutex.RLock()
	defer m.mutex.RUnlock()

	t, ok := m.templates[name]
	if !ok {
		return nil, errors.New("template not found: " + name)
	}
	return t, nil
}
