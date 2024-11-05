CREATE TABLE tags (
                      id INT PRIMARY KEY AUTO_INCREMENT,
                      name VARCHAR(20) NOT NULL,
                      user_id VARCHAR(255) NOT NULL,  -- usersテーブルのIDとリレーション
                      `order` INT NOT NULL,  -- タグの順番を管理
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);