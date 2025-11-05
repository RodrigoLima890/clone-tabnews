import { createRouter } from "next-connect";
import controller from "infra/controllers";
import user from "models/user";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.erroHandler);

async function getHandler(request, response) {
  const username = request.query.username;
  const userFound = await user.findOneByUsername(username);
  return response.status(200).json(userFound);
}
