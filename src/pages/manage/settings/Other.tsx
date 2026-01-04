import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  SimpleGrid,
} from "@hope-ui/solid"
import { createSignal, For } from "solid-js"
import { FolderChooseInput, MaybeLoading } from "~/components"
import { useFetch, useManageTitle, useT, useUtil } from "~/hooks"
import { Group, SettingItem, PResp } from "~/types"
import { handleResp, notify, r } from "~/utils"
import { Item } from "./SettingItem"

interface SettingConfig {
  key: string
  titleKey: string
  api: string
  fields: Array<{
    key: string
    type: "input" | "folder"
    labelKey: string
    signal: any
    setSignal: (value: string) => void
  }>
  buttonKey?: string
}

const OtherSettings = () => {
  const t = useT()
  useManageTitle("manage.sidemenu.other")

  const [uri, setUri] = createSignal("")
  const [secret, setSecret] = createSignal("")
  const [qbitUrl, setQbitUrl] = createSignal("")
  const [pan123TempDir, set123TempDir] = createSignal("")
  const [qbitSeedTime, setQbitSeedTime] = createSignal("")
  const [transmissionUrl, setTransmissionUrl] = createSignal("")
  const [transmissionSeedTime, setTransmissionSeedTime] = createSignal("")
  const [pan115TempDir, set115TempDir] = createSignal("")
  const [pan115OpenTempDir, set115OpenTempDir] = createSignal("")
  const [pan123OpenTempDir, set123OpenTempDir] = createSignal("")
  const [pan123OpenCallbackUrl, set123OpenCallbackUrl] = createSignal("")
  const [pikpakTempDir, setPikPakTempDir] = createSignal("")
  const [thunderTempDir, setThunderTempDir] = createSignal("")
  const [thunderBrowserTempDir, setThunderBrowserTempDir] = createSignal("")
  const [thunderXTempDir, setThunderXTempDir] = createSignal("")
  const [token, setToken] = createSignal("")
  const [settings, setSettings] = createSignal<SettingItem[]>([])

  const settingConfigs: SettingConfig[] = [
    {
      key: "aria2",
      titleKey: "settings_other.aria2",
      api: "/admin/setting/set_aria2",
      fields: [
        {
          key: "aria2_uri",
          type: "input",
          labelKey: "aria2_uri",
          signal: uri,
          setSignal: setUri,
        },
        {
          key: "aria2_secret",
          type: "input",
          labelKey: "aria2_secret",
          signal: secret,
          setSignal: setSecret,
        },
      ],
    },
    {
      key: "qbittorrent",
      titleKey: "settings_other.qbittorrent",
      api: "/admin/setting/set_qbit",
      fields: [
        {
          key: "qbittorrent_url",
          type: "input",
          labelKey: "qbittorrent_url",
          signal: qbitUrl,
          setSignal: setQbitUrl,
        },
        {
          key: "qbittorrent_seedtime",
          type: "input",
          labelKey: "qbittorrent_seedtime",
          signal: qbitSeedTime,
          setSignal: setQbitSeedTime,
        },
      ],
    },
    {
      key: "transmission",
      titleKey: "settings_other.transmission",
      api: "/admin/setting/set_transmission",
      fields: [
        {
          key: "transmission_uri",
          type: "input",
          labelKey: "transmission_uri",
          signal: transmissionUrl,
          setSignal: setTransmissionUrl,
        },
        {
          key: "transmission_seedtime",
          type: "input",
          labelKey: "transmission_seedtime",
          signal: transmissionSeedTime,
          setSignal: setTransmissionSeedTime,
        },
      ],
    },
    {
      key: "115",
      titleKey: "settings_other.115",
      api: "/admin/setting/set_115",
      fields: [
        {
          key: "115_temp_dir",
          type: "folder",
          labelKey: "settings_other.115_temp_dir",
          signal: pan115TempDir,
          setSignal: set115TempDir,
        },
      ],
    },
    {
      key: "115_open",
      titleKey: "settings_other.115_open",
      api: "/admin/setting/set_115_open",
      fields: [
        {
          key: "115_open_temp_dir",
          type: "folder",
          labelKey: "settings_other.115_open_temp_dir",
          signal: pan115OpenTempDir,
          setSignal: set115OpenTempDir,
        },
      ],
    },
    {
      key: "123_pan",
      titleKey: "settings_other.123_pan",
      api: "/admin/setting/set_123_pan",
      fields: [
        {
          key: "123_pan_temp_dir",
          type: "folder",
          labelKey: "settings_other.123_temp_dir",
          signal: pan123TempDir,
          setSignal: set123TempDir,
        },
      ],
    },
    {
      key: "123_open",
      titleKey: "settings_other.123_open",
      api: "/admin/setting/set_123_open",
      fields: [
        {
          key: "123_open_temp_dir",
          type: "folder",
          labelKey: "settings_other.123_open_temp_dir",
          signal: pan123OpenTempDir,
          setSignal: set123OpenTempDir,
        },
        {
          key: "123_open_callback_url",
          type: "input",
          labelKey: "settings_other.123_open_callback_url",
          signal: pan123OpenCallbackUrl,
          setSignal: set123OpenCallbackUrl,
        },
      ],
    },
    {
      key: "pikpak",
      titleKey: "settings_other.pikpak",
      api: "/admin/setting/set_pikpak",
      fields: [
        {
          key: "pikpak_temp_dir",
          type: "folder",
          labelKey: "settings_other.pikpak_temp_dir",
          signal: pikpakTempDir,
          setSignal: setPikPakTempDir,
        },
      ],
    },
    {
      key: "thunder",
      titleKey: "settings_other.thunder",
      api: "/admin/setting/set_thunder",
      fields: [
        {
          key: "thunder_temp_dir",
          type: "folder",
          labelKey: "settings_other.thunder_temp_dir",
          signal: thunderTempDir,
          setSignal: setThunderTempDir,
        },
      ],
    },
    {
      key: "thunder_browser",
      titleKey: "settings_other.thunder_browser",
      api: "/admin/setting/set_thunder_browser",
      fields: [
        {
          key: "thunder_browser_temp_dir",
          type: "folder",
          labelKey: "settings_other.thunder_browser_temp_dir",
          signal: thunderBrowserTempDir,
          setSignal: setThunderBrowserTempDir,
        },
      ],
    },
    {
      key: "thunderx",
      titleKey: "settings_other.thunderx",
      api: "/admin/setting/set_thunderx",
      fields: [
        {
          key: "thunderx_temp_dir",
          type: "folder",
          labelKey: "settings_other.thunderX_temp_dir",
          signal: thunderXTempDir,
          setSignal: setThunderXTempDir,
        },
      ],
    },
  ]

  const [settingsLoading, settingsData] = useFetch(
    (): PResp<SettingItem[]> =>
      r.get(`/admin/setting/list?groups=${Group.ARIA2},${Group.SINGLE}`),
  )

  const refresh = async () => {
    const resp = await settingsData()
    handleResp(resp, (data) => {
      setUri(data.find((i) => i.key === "aria2_uri")?.value || "")
      setSecret(data.find((i) => i.key === "aria2_secret")?.value || "")
      setToken(data.find((i) => i.key === "token")?.value || "")
      setQbitUrl(data.find((i) => i.key === "qbittorrent_url")?.value || "")
      set123TempDir(data.find((i) => i.key === "123_pan_temp_dir")?.value || "")
      setQbitSeedTime(
        data.find((i) => i.key === "qbittorrent_seedtime")?.value || "",
      )
      setTransmissionUrl(
        data.find((i) => i.key === "transmission_uri")?.value || "",
      )
      setTransmissionSeedTime(
        data.find((i) => i.key === "transmission_seedtime")?.value || "",
      )
      set115TempDir(data.find((i) => i.key === "115_temp_dir")?.value || "")
      set115OpenTempDir(
        data.find((i) => i.key === "115_open_temp_dir")?.value || "",
      )
      set123OpenTempDir(
        data.find((i) => i.key == "123_open_temp_dir")?.value || "",
      )
      set123OpenCallbackUrl(
        data.find((i) => i.key === "123_open_callback_url")?.value || "",
      )
      setPikPakTempDir(
        data.find((i) => i.key === "pikpak_temp_dir")?.value || "",
      )
      setThunderTempDir(
        data.find((i) => i.key === "thunder_temp_dir")?.value || "",
      )
      setThunderXTempDir(
        data.find((i) => i.key === "thunderx_temp_dir")?.value || "",
      )
      setThunderBrowserTempDir(
        data.find((i) => i.key === "thunder_browser_temp_dir")?.value || "",
      )
      setSettings(data)
    })
  }
  refresh()

  const [resetTokenLoading, resetToken] = useFetch(
    (): PResp<string> => r.post("/admin/setting/reset_token"),
  )
  const { copy } = useUtil()

  // create fetch hooks for each setting config
  const settingFetchHooks = settingConfigs.map((config) => {
    const [loading, fetchFn] = useFetch((): PResp<string> => {
      const params: any = {}
      config.fields.forEach((field) => {
        params[field.key] = field.signal()
      })
      return r.post(config.api, params)
    })
    return { config, loading, fetchFn }
  })

  const renderSettingSection = (item: (typeof settingFetchHooks)[number]) => {
    const { config, loading, fetchFn } = item

    return (
      <>
        <Heading my="$2">{t(config.titleKey)}</Heading>
        {config.fields.length === 2 && config.fields[0].type === "input" ? (
          <SimpleGrid gap="$2" columns={{ "@initial": 1, "@md": 2 }}>
            <For each={config.fields}>
              {(field) => (
                <Item
                  {...settings().find((i) => i.key === field.key)!}
                  value={field.signal()}
                  onChange={(str: string) => field.setSignal(str)}
                />
              )}
            </For>
          </SimpleGrid>
        ) : (
          <FormControl w="$full" display="flex" flexDirection="column">
            <For each={config.fields}>
              {(field) => (
                <>
                  <FormLabel for={field.key} display="flex" alignItems="center">
                    {t(field.labelKey)}
                  </FormLabel>
                  {field.type === "folder" ? (
                    <FolderChooseInput
                      id={field.key}
                      value={field.signal()}
                      onChange={(path: string) => field.setSignal(path)}
                    />
                  ) : (
                    <Input
                      id={field.key}
                      value={field.signal()}
                      onInput={(e: any) => field.setSignal(e.target.value)}
                    />
                  )}
                </>
              )}
            </For>
          </FormControl>
        )}
        <Button
          my="$2"
          loading={loading()}
          onClick={async () => {
            const resp = await fetchFn()
            handleResp(resp, (data) => {
              notify.success(data)
            })
          }}
        >
          {t(config.buttonKey ?? "global.save")}
        </Button>
      </>
    )
  }

  return (
    <MaybeLoading loading={settingsLoading()}>
      <For each={settingFetchHooks}>{(item) => renderSettingSection(item)}</For>

      <Heading my="$2">{t("settings.token")}</Heading>
      <Input value={token()} readOnly />
      <HStack my="$2" spacing="$2">
        <Button
          onClick={() => {
            copy(token())
          }}
        >
          {t("settings_other.copy_token")}
        </Button>
        <Button
          colorScheme="danger"
          loading={resetTokenLoading()}
          onClick={async () => {
            const resp = await resetToken()
            handleResp(resp, (data) => {
              notify.success(t("settings_other.reset_token_success"))
              setToken(data)
            })
          }}
        >
          {t("settings_other.reset_token")}
        </Button>
      </HStack>
    </MaybeLoading>
  )
}

export default OtherSettings
