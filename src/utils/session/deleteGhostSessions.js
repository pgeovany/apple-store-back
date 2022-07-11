import { getDataBase } from '../../databases/mongo.js';

const TWENTY_FOUR_HOURS = 60 * 60 * 24 * 1000; // eslint-disable-line no-magic-numbers

function deleteGhostSessions() {
  setInterval(async () => {
    const ONE_HOUR_FROM_NOW = Date.now() - 60 * 60 * 1000; // eslint-disable-line no-magic-numbers

    try {
      const db = await getDataBase();

      await db
        .collection('sessions')
        .deleteMany({ createdAt: { $lte: ONE_HOUR_FROM_NOW } });
    } catch (error) {
      console.log('Erro ao remover as sessões!');
    }
  }, TWENTY_FOUR_HOURS);
}

export default deleteGhostSessions;
