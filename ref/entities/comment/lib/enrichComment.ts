
// Универсальная функция для обогащения комментария данными member и replies
export const enrichComment = (comment, members, allComments) => {
  if (!comment?.memberId || !members) {return null;}

  // Находим member по memberId
  const member = members.find(member => member.id === comment.memberId);
  if (!member) {return null;}

  // Находим replies - комментарии, где parentId равен id текущего комментария
  const replies = allComments.filter(reply => reply.parentId === comment.id);

  // Рекурсивно обогащаем каждый reply
  const enrichedReplies = replies.map(reply => enrichComment(reply, members, allComments)).filter(Boolean);

  return {
    ...comment,
    member,
    replies: enrichedReplies,
  };
};
