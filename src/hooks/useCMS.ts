import { useState, useEffect } from 'react';
import { cmsApi } from '../services/cmsApi';

export function useCMS(divisionSlug: string) {
    const [content, setContent] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let mounted = true;

        async function fetchContent() {
            try {
                setLoading(true);
                const data = await cmsApi.getDivisionContent(divisionSlug);

                if (mounted && data && data.blocks) {
                    // Transform array of blocks into a dictionary keyed by block_type
                    const contentMap = data.blocks.reduce((acc: any, block: any) => {
                        acc[block.block_type] = block.content_payload;
                        return acc;
                    }, {});

                    setContent(contentMap);
                }
            } catch (err: any) {
                if (mounted) setError(err);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchContent();

        return () => {
            mounted = false;
        };
    }, [divisionSlug]);

    return { content, loading, error };
}

export function useGlobalCMS() {
    const [settings, setSettings] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let mounted = true;

        async function fetchSettings() {
            try {
                setLoading(true);
                const data = await cmsApi.getGlobalSettings();

                if (mounted && data && data.settings) {
                    setSettings(data.settings);
                }
            } catch (err: any) {
                if (mounted) setError(err);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchSettings();

        return () => {
            mounted = false;
        };
    }, []);

    return { settings, loading, error };
}
