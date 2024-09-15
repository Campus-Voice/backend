module.exports = (db) => {
  const { User, Notification, Party, PartyMember, Post, Vote, Chat, Message, Comment } = db;

  if (User && Notification) {
    User.hasMany(Notification, { foreignKey: 'userId' });
    Notification.belongsTo(User, { foreignKey: 'userId' });
  }

  if (User && Party && PartyMember) {
    Party.belongsTo(User, { foreignKey: 'leaderId' });
    Party.hasMany(PartyMember, { foreignKey: 'partyId' });
    User.hasMany(PartyMember, { foreignKey: 'userId' });
  }

  if (Party && Post && User) {
    Party.hasMany(Post, { foreignKey: 'partyId' });
    User.hasMany(Post, { foreignKey: 'userId' });
    Post.belongsTo(Party, { foreignKey: 'partyId' });
    Post.belongsTo(User, { foreignKey: 'userId' });
  }

  if (User && Vote && Post) {
    User.hasMany(Vote, { foreignKey: 'userId' });
    Post.hasMany(Vote, { foreignKey: 'postId' });
    Vote.belongsTo(User, { foreignKey: 'userId' });
    Vote.belongsTo(Post, { foreignKey: 'postId' });
  }

  // Chat <-> User: Many-to-Many (through ChatParticipants)
  if (User && Chat) {
    Chat.belongsToMany(User, { through: 'ChatParticipants', foreignKey: 'chatId', as: 'Participants' });
    User.belongsToMany(Chat, { through: 'ChatParticipants', foreignKey: 'userId', as: 'Chats' });
  }

  // Message <-> User: One-to-Many (senderId and receiverId)
  if (User && Message) {
    User.hasMany(Message, { foreignKey: 'senderId', as: 'SentMessages' });
    User.hasMany(Message, { foreignKey: 'receiverId', as: 'ReceivedMessages' });
    Message.belongsTo(User, { foreignKey: 'senderId', as: 'Sender' });
    Message.belongsTo(User, { foreignKey: 'receiverId', as: 'Receiver' });
  }

  // Chat <-> Message: One-to-Many
  if (Chat && Message) {
    Chat.hasMany(Message, { foreignKey: 'chatId', as: 'Messages' });
    Message.belongsTo(Chat, { foreignKey: 'chatId' });
  }

  // Post <-> Comment: One-to-Many
  if (Post && Comment) {
    Post.hasMany(Comment, { foreignKey: 'postId', as: 'Comments' });
    Comment.belongsTo(Post, { foreignKey: 'postId', as: 'Post' });
  }

  // User <-> Comment: One-to-Many
  if (User && Comment) {
    User.hasMany(Comment, { foreignKey: 'userId', as: 'Comments' });
    Comment.belongsTo(User, { foreignKey: 'userId', as: 'User' });
  }

  // Comment <-> Comment: Self-referencing for threaded comments (optional)
  if (Comment) {
    Comment.hasMany(Comment, { foreignKey: 'parentCommentId', as: 'Replies' });
    Comment.belongsTo(Comment, { foreignKey: 'parentCommentId', as: 'ParentComment' });
  }
};
