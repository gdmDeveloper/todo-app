import Group from '../models/Group';
import Task from '../models/Task';
import User from '../models/User';
import { generateCode } from '../utils/generateGroupCode';

const createGroup = async (req, res) => {
  const { name, description = '' } = req.body;

  // Generate crypto code for group invitation

  const groupCode = generateCode();

  const group = await Group.create({
    name,
    description,
    invitationCode: groupCode,
    members: [
      {
        user: req.user.id,
        rol: 'admin',
      },
    ],
  });

  res.status(200).json(group);
};

export { createGroup };
