module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      content: {
        type: DataTypes.TEXT,
        allowNull: false, 
      },
    }, { timestamps: true }); 
  
    // Associations
    Comment.associate = (models) => {
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User',
        onDelete: 'CASCADE',
      });
  
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'Post',
        onDelete: 'CASCADE',
      });
  
      Comment.belongsTo(models.Comment, {
        foreignKey: 'parentCommentId',
        as: 'ParentComment',
        onDelete: 'CASCADE',
        allowNull: true, 
      });
  
      Comment.hasMany(models.Comment, {
        foreignKey: 'parentCommentId',
        as: 'Replies',
      });
    };
  
    return Comment;
  };
  