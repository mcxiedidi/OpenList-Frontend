import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  SimpleGrid,
} from "@hope-ui/solid"
import { For } from "solid-js"
import { createStore } from "solid-js/store"
import { FolderChooseInput, MaybeLoading } from "~/components"
import { useFetch, useManageTitle, useT, useUtil } from "~/hooks"
import { Group, SettingItem, PResp } from "~/types"
import { handleResp, notify, r } from "~/utils"
import { Item } from "./SettingItem"

interface FieldConfig {
  key: string
  type: "input" | "folder"
  labelKey: string
}

interface SettingConfig {
  key: string
  titleKey: string
  api: string
  fields: FieldConfig[]
  buttonKey?: string
}

const OtherSettings = () => {
  const t = useT()
  const { copy } = useUtil()
  useManageTitle("manage.sidemenu.other")

  // use Store to manage form data
  const [form, setForm] = createStore<Record<string, string>>({
    token: "",
  })

  const [settings, setSettings] = createStore<{ list: SettingItem[] }>({
    list: [],
  })

  const settingConfigs: SettingConfig[] = [
    {
      key: "aria2",
      titleKey: "settings_other.aria2",
      api: "/admin/setting/set_aria2",
      fields: [
        { key: "uri", type: "input", labelKey: "aria2_uri" },
        { key: "secret", type: "input", labelKey: "aria2_secret" },
      ],
    },
    {
      key: "qbittorrent",
      titleKey: "settings_other.qbittorrent",
      api: "/admin/setting/set_qbit",
      fields: [
        { key: "url", type: "input", labelKey: "qbittorrent_url" },
        {
          key: "seedtime",
          type: "input",
          labelKey: "qbittorrent_seedtime",
        },
      ],
    },
    {
      key: "transmission",
      titleKey: "settings_other.transmission",
      api: "/admin/setting/set_transmission",
      fields: [
        {
          key: "uri",
          type: "input",
          labelKey: "transmission_uri",
        },
        {
          key: "seedtime",
          type: "input",
          labelKey: "transmission_seedtime",
        },
      ],
    },
    {
      key: "115",
      titleKey: "settings_other.115",
      api: "/admin/setting/set_115",
      fields: [
        {
          key: "temp_dir",
          type: "folder",
          labelKey: "settings_other.115_temp_dir",
        },
      ],
    },
    {
      key: "115_open",
      titleKey: "settings_other.115_open",
      api: "/admin/setting/set_115_open",
      fields: [
        {
          key: "temp_dir",
          type: "folder",
          labelKey: "settings_other.115_open_temp_dir",
        },
      ],
    },
    {
      key: "123_pan",
      titleKey: "settings_other.123_pan",
      api: "/admin/setting/set_123_pan",
      fields: [
        {
          key: "temp_dir",
          type: "folder",
          labelKey: "settings_other.123_temp_dir",
        },
      ],
    },
    {
      key: "123_open",
      titleKey: "settings_other.123_open",
      api: "/admin/setting/set_123_open",
      fields: [
        {
          key: "temp_dir",
          type: "folder",
          labelKey: "settings_other.123_open_temp_dir",
        },
        {
          key: "callback_url",
          type: "input",
          labelKey: "settings_other.123_open_callback_url",
        },
      ],
    },
    {
      key: "pikpak",
      titleKey: "settings_other.pikpak",
      api: "/admin/setting/set_pikpak",
      fields: [
        {
          key: "temp_dir",
          type: "folder",
          labelKey: "settings_other.pikpak_temp_dir",
        },
      ],
    },
    {
      key: "thunder",
      titleKey: "settings_other.thunder",
      api: "/admin/setting/set_thunder",
      fields: [
        {
          key: "temp_dir",
          type: "folder",
          labelKey: "settings_other.thunder_temp_dir",
        },
      ],
    },
    {
      key: "thunder_browser",
      titleKey: "settings_other.thunder_browser",
      api: "/admin/setting/set_thunder_browser",
      fields: [
        {
          key: "temp_dir",
          type: "folder",
          labelKey: "settings_other.thunder_browser_temp_dir",
        },
      ],
    },
    {
      key: "thunderx",
      titleKey: "settings_other.thunderx",
      api: "/admin/setting/set_thunderx",
      fields: [
        {
          key: "temp_dir",
          type: "folder",
          labelKey: "settings_other.thunderX_temp_dir",
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
      const newForm: Record<string, string> = {}
      data.forEach((item) => {
        newForm[item.key] = item.value
      })
      setForm(newForm)
      setSettings("list", data)
    })
  }
  refresh()

  const [resetTokenLoading, resetToken] = useFetch(
    (): PResp<string> => r.post("/admin/setting/reset_token"),
  )

  // generic data submit
  const submitConfig = (config: SettingConfig) => {
    const [loading, fetchFn] = useFetch((): PResp<string> => {
      const payload: any = {}
      config.fields.forEach((f) => (payload[f.key] = form[f.key]))
      return r.post(config.api, payload)
    })

    return {
      loading,
      execute: async () => {
        const resp = await fetchFn()
        handleResp(resp, (data) => notify.success(data))
      },
    }
  }

  return (
    <MaybeLoading loading={settingsLoading()}>
      <For each={settingConfigs}>
        {(config) => {
          const { loading, execute } = submitConfig(config)
          return (
            <>
              <Heading my="$2">{t(config.titleKey)}</Heading>
              {config.fields.length === 2 &&
              config.fields[0].type === "input" ? (
                <SimpleGrid gap="$2" columns={{ "@initial": 1, "@md": 2 }}>
                  <For each={config.fields}>
                    {(field) => (
                      <Item
                        {...settings.list.find((i) => i.key === field.key)!}
                        value={form[field.key] || ""}
                        onChange={(val) => setForm(field.key, val)}
                      />
                    )}
                  </For>
                </SimpleGrid>
              ) : (
                <FormControl w="$full" display="flex" flexDirection="column">
                  <For each={config.fields}>
                    {(field) => (
                      <>
                        <FormLabel for={field.key}>
                          {t(field.labelKey)}
                        </FormLabel>
                        {field.type === "folder" ? (
                          <FolderChooseInput
                            id={field.key}
                            value={form[field.key] || ""}
                            onChange={(val) => setForm(field.key, val)}
                          />
                        ) : (
                          <Input
                            id={field.key}
                            value={form[field.key] || ""}
                            onInput={(e: any) =>
                              setForm(field.key, e.target.value)
                            }
                          />
                        )}
                      </>
                    )}
                  </For>
                </FormControl>
              )}
              <Button my="$2" loading={loading()} onClick={execute}>
                {t(config.buttonKey ?? "global.save")}
              </Button>
            </>
          )
        }}
      </For>

      <Heading my="$2">{t("settings.token")}</Heading>
      <Input value={form.token} readOnly />
      <HStack my="$2" spacing="$2">
        <Button onClick={() => copy(form.token)}>
          {t("settings_other.copy_token")}
        </Button>
        <Button
          colorScheme="danger"
          loading={resetTokenLoading()}
          onClick={async () => {
            const resp = await resetToken()
            handleResp(resp, (data) => {
              notify.success(t("settings_other.reset_token_success"))
              setForm("token", data)
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
