import { PlatformId } from "@shared/types";
import { getPlatformById } from "@shared/utils/platform";

it('Streaming platforms - Kick', async () => {
  expect.assertions(1);

  const kick = getPlatformById(PlatformId.Kick);
  const channel = {
    id: "0",
    twitch: "evelone192",
    source: {
      id: PlatformId.Kick,
      channelId: "evelone"
    }
  };
  const response = await kick.getInfo(channel);
  const exceptedResponse = {};

  await expect(response).resolves.toBe(exceptedResponse);
});