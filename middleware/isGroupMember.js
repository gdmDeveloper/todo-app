import Group from '../models/Group';

export const isGroupMember = async (req, res) => {
  const { groupId } = req.body;

  const group = await Group.findById(groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });

  const member = group.members.some((m) => m.user._id.equals(req.user.id));
  if (!member) return res.status(403).json({ error: 'You are not a member of this group' });

  req.group = group;
  next();
};
