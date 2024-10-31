export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      color_sets: {
        Row: {
          created_date: string
          id: number
          modified_date: string
        }
        Insert: {
          created_date?: string
          id: number
          modified_date?: string
        }
        Update: {
          created_date?: string
          id?: number
          modified_date?: string
        }
        Relationships: []
      }
      color_sets_colors_m2m: {
        Row: {
          color_id: number
          color_set_id: number
          created_date: string
          id: number
          modified_date: string
        }
        Insert: {
          color_id: number
          color_set_id: number
          created_date?: string
          id?: number
          modified_date?: string
        }
        Update: {
          color_id?: number
          color_set_id?: number
          created_date?: string
          id?: number
          modified_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "color_id_fk"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "color_sets_id_fk"
            columns: ["color_set_id"]
            isOneToOne: false
            referencedRelation: "color_sets"
            referencedColumns: ["id"]
          },
        ]
      }
      colors: {
        Row: {
          created_date: string
          hex: string
          id: number
          modified_date: string
          name: string
        }
        Insert: {
          created_date?: string
          hex: string
          id: number
          modified_date?: string
          name: string
        }
        Update: {
          created_date?: string
          hex?: string
          id?: number
          modified_date?: string
          name?: string
        }
        Relationships: []
      }
      databasechangelog: {
        Row: {
          author: string
          comments: string | null
          contexts: string | null
          dateexecuted: string
          deployment_id: string | null
          description: string | null
          exectype: string
          filename: string
          id: string
          labels: string | null
          liquibase: string | null
          md5sum: string | null
          orderexecuted: number
          tag: string | null
        }
        Insert: {
          author: string
          comments?: string | null
          contexts?: string | null
          dateexecuted: string
          deployment_id?: string | null
          description?: string | null
          exectype: string
          filename: string
          id: string
          labels?: string | null
          liquibase?: string | null
          md5sum?: string | null
          orderexecuted: number
          tag?: string | null
        }
        Update: {
          author?: string
          comments?: string | null
          contexts?: string | null
          dateexecuted?: string
          deployment_id?: string | null
          description?: string | null
          exectype?: string
          filename?: string
          id?: string
          labels?: string | null
          liquibase?: string | null
          md5sum?: string | null
          orderexecuted?: number
          tag?: string | null
        }
        Relationships: []
      }
      databasechangeloglock: {
        Row: {
          id: number
          locked: boolean
          lockedby: string | null
          lockgranted: string | null
        }
        Insert: {
          id: number
          locked: boolean
          lockedby?: string | null
          lockgranted?: string | null
        }
        Update: {
          id?: number
          locked?: boolean
          lockedby?: string | null
          lockgranted?: string | null
        }
        Relationships: []
      }
      elements: {
        Row: {
          created_date: string
          id: string
          modified_date: string
          number: number
          type: string
        }
        Insert: {
          created_date?: string
          id: string
          modified_date?: string
          number: number
          type: string
        }
        Update: {
          created_date?: string
          id?: string
          modified_date?: string
          number?: number
          type?: string
        }
        Relationships: []
      }
      elements_color_sets_m2m: {
        Row: {
          color_set_id: number
          element_id: string
          id: number
        }
        Insert: {
          color_set_id: number
          element_id: string
          id?: number
        }
        Update: {
          color_set_id?: number
          element_id?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "color_sets_id_fk"
            columns: ["color_set_id"]
            isOneToOne: false
            referencedRelation: "color_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "elements_id_fk"
            columns: ["element_id"]
            isOneToOne: false
            referencedRelation: "elements"
            referencedColumns: ["id"]
          },
        ]
      }
      layers: {
        Row: {
          animation_type: string
          created_date: string
          element_id: string
          gender: string
          id: number
          modified_date: string
          value: string
        }
        Insert: {
          animation_type: string
          created_date?: string
          element_id: string
          gender: string
          id?: number
          modified_date?: string
          value: string
        }
        Update: {
          animation_type?: string
          created_date?: string
          element_id?: string
          gender?: string
          id?: number
          modified_date?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "elements_id_fk"
            columns: ["element_id"]
            isOneToOne: false
            referencedRelation: "elements"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      epoch_to_timestamp: {
        Args: {
          epoch: string
        }
        Returns: string
      }
      pull: {
        Args: {
          last_pulled_at?: number
        }
        Returns: Json
      }
      timestamp_to_epoch: {
        Args: {
          ts: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
