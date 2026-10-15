import matches from "../data/matches.json";
import teams from "../data/teams.json";
import leagues from "../data/leagues.json";
import players from "../data/players.json";
import standings from "../data/standings.json";
import timelines from "../data/timelines.json";

function wait(ms = 220) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function hydrateMatch(match) {
  return {
    ...match,
    home: teams.find((team) => team.id === match.homeId),
    away: teams.find((team) => team.id === match.awayId),
    league: leagues.find((league) => league.id === match.leagueId),
  };
}

function liveTick(match) {
  if (match.status !== "live") return match;
  const bump = Math.random() > 0.72;
  if (!bump) {
    return { ...match, minute: Math.min(match.minute + 1, 90) };
  }
  const home = Math.random() > 0.5;
  return {
    ...match,
    minute: Math.min(match.minute + 1, 90),
    homeScore: match.homeScore + (home ? 1 : 0),
    awayScore: match.awayScore + (home ? 0 : 1),
  };
}

let liveCache = matches.map((match) => ({ ...match }));

export const sportsApi = {
  async getMatches(filters = {}) {
    await wait();
    liveCache = liveCache.map(liveTick);
    return liveCache
      .map(hydrateMatch)
      .filter((match) => !filters.sport || filters.sport === "all" || match.sport === filters.sport)
      .filter((match) => !filters.status || filters.status === "all" || match.status === filters.status)
      .filter((match) => !filters.leagueId || filters.leagueId === "all" || match.leagueId === filters.leagueId)
      .filter((match) => !filters.date || match.date === filters.date);
  },

  async getMatch(id) {
    await wait();
    const match = liveCache.find((item) => item.id === id);
    if (!match) return null;
    return {
      ...hydrateMatch(match),
      timeline: timelines[id] ?? [],
      stats: {
        possession: [58, 42],
        shots: [14, 9],
        passes: [512, 430],
        corners: [7, 3],
      },
      momentum: [
        { minute: 10, home: 48, away: 52 },
        { minute: 20, home: 61, away: 39 },
        { minute: 30, home: 55, away: 45 },
        { minute: 40, home: 42, away: 58 },
        { minute: 50, home: 63, away: 37 },
        { minute: 60, home: 70, away: 30 },
        { minute: 70, home: 57, away: 43 },
      ],
      lineups: {
        home: ["Ederson", "Dias", "Akanji", "Gvardiol", "Walker", "Rodri", "Silva", "De Bruyne", "Foden", "Grealish", "Haaland"],
        away: ["Alisson", "Van Dijk", "Konate", "Robertson", "Alexander-Arnold", "Mac Allister", "Gravenberch", "Szoboszlai", "Salah", "Diaz", "Nunez"],
      },
    };
  },

  async getLeagues() {
    await wait();
    return leagues;
  },

  async getTeams() {
    await wait();
    return teams.map((team) => ({
      ...team,
      league: leagues.find((league) => league.id === team.leagueId),
    }));
  },

  async getTeam(id) {
    await wait();
    const team = teams.find((item) => item.id === id);
    if (!team) return null;
    return {
      ...team,
      league: leagues.find((league) => league.id === team.leagueId),
      squad: players.filter((player) => player.teamId === id),
      fixtures: liveCache.filter((match) => match.homeId === id || match.awayId === id).map(hydrateMatch),
    };
  },

  async getPlayers() {
    await wait();
    return players.map((player) => ({
      ...player,
      team: teams.find((team) => team.id === player.teamId),
    }));
  },

  async getPlayer(id) {
    await wait();
    const player = players.find((item) => item.id === id);
    if (!player) return null;
    return {
      ...player,
      team: teams.find((team) => team.id === player.teamId),
    };
  },

  async getStandings(leagueId = "epl") {
    await wait();
    return (standings[leagueId] ?? []).map((row) => ({
      ...row,
      team: teams.find((team) => team.id === row.teamId),
    }));
  },
};
