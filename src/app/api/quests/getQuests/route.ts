import { NextResponse } from 'next/server'
import axios from 'axios'

interface QuestParams {
  PageNumber: string | null;
  PageSize: string | null;
  SearchQuery: string;
  SortDifficulty: string | null;
  SortTags?: string[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  const params: QuestParams = {
    PageNumber: searchParams.get('PageNumber'),
    PageSize: searchParams.get('PageSize'),
    SearchQuery: searchParams.get('SearchQuery') || '',
    SortDifficulty: searchParams.get('SortDifficulty'),
  }

  const sortTags = searchParams.get('SortTags')
  if (sortTags) {
    params.SortTags = sortTags.split(',')
  }

  try {
    const response = await axios.get("http://localhost:8080/Quest/GetQuests", {
      params,
      paramsSerializer: {
        serialize: (params) => {
          const queryString = new URLSearchParams()
          for (const key in params) {
            if (Array.isArray(params[key])) {
              queryString.append(key, params[key].join(','))
            } else if (params[key] !== null && params[key] !== undefined) {
              queryString.append(key, params[key])
            }
          }
          return queryString.toString()
        }
      }
    })

    return NextResponse.json(response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          params: error.config?.params,
        }
      })
    }

    return NextResponse.json(
      { error: 'Failed to fetch quests' },
      { status: 500 }
    )
  }
}