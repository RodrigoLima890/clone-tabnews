import { createRouter } from "next-connect";
import controller from "infra/controllers";
import user from "models/user";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.erroHandler);

async function postHandler(request, response) {
  const userInputValues = request.body;
  const newUser = await user.create(userInputValues);
  return response.status(201).json(newUser);
}
