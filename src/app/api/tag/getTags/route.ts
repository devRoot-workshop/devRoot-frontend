import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('searchQuery') || '';

  try {
    const response = await axios.get("http://localhost:8080/Tag/GetTags", {
      params: {
        searchQuery: query
      },
      paramsSerializer: {
        serialize: (params) => {
          const queryString = new URLSearchParams();
          for (const key in params) {
            if (params[key] !== null && params[key] !== undefined) {
              queryString.append(key, params[key]);
            }
          }
          return queryString.toString();
        }
      }
    });

    const tags = response.data.map((tag: { id: number; name: string }) => ({
      id: tag.id,
      name: tag.name,
    }));

    return NextResponse.json(tags);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          params: error.config?.params,
        }
      });
    }

    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}
