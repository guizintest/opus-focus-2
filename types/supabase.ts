export interface UserProfile {
  id: string
  username: string | null
  focus_points: number
  recreation_points: number
  current_mood: "good" | "normal" | "bad"
  created_at: string
  updated_at: string
}

export interface DailyMap {
  id: string
  name: string
  description: string | null
  difficulty: string
  created_at: string
  is_active: boolean
  special_hex_id: string | null
  day_date: string
}

export interface Hexagon {
  id: string
  map_id: string
  hex_id: string
  title: string
  description: string | null
  difficulty: "easy" | "medium" | "hard" | "reward" | "special" | "start"
  type: "reading" | "coding" | "video" | "quiz" | "reward" | "special" | "start"
  points: number
  estimated_time: string | null
  position_q: number
  position_r: number
  position_s: number
}

export interface HexConnection {
  id: string
  map_id: string
  from_hex_id: string
  to_hex_id: string
}

export interface UserMapProgress {
  id: string
  user_id: string
  map_id: string
  started_at: string
  completed_at: string | null
  is_completed: boolean
  remaining_free_pauses: number
}

export interface UserHexProgress {
  id: string
  user_id: string
  map_id: string
  hex_id: string
  status: "locked" | "available" | "conquered"
  conquered_at: string | null
}

export interface Mission {
  id: string
  map_id: string
  title: string
  description: string | null
  type: "main" | "side"
  reward: string | null
  reward_amount: number
}

export interface UserMissionProgress {
  id: string
  user_id: string
  mission_id: string
  progress: string | null
  is_completed: boolean
  completed_at: string | null
}

export interface UserEvent {
  id: string
  user_id: string
  map_id: string | null
  event_type: string
  event_data: any
  created_at: string
}

export interface FogAttackQuiz {
  id: string
  hex_id: string
  map_id: string
  question: string
  options: string[]
  correct_answer: number
}
