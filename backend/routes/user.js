import express from 'express';
import { getUsers, getRoles, updateUser, deleteUser } from '../controllers/user.js';
import { authenticated, hasRole } from '../middlewars/index.js';
import { mapUser } from '../helpers/index.js';
import { ROLES } from '../constants/index.js';

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const users = await getUsers();

    res.send({
      data: users.map(mapUser),
      error: null,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      error: error.message,
    });
  }
});

router.get('/roles', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = getRoles();

  res.send({ data: roles });
});

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newUser = await updateUser(req.params.id, {
    role: req.body.roleId,
  });

  res.send({ data: mapUser(newUser) });
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id);

  res.send({ error: null });
});

export default router;
