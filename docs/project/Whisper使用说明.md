# Whisper安装和使用说明

- [Whisper安装和使用说明](#whisper安装和使用说明)
  - [常用参数](#常用参数)
- [参考资料](#参考资料)


**必须使用<3.11版本的Python**
以下在Windows环境下运行，使用项目文件夹`\whisper`


1. 创建并激活虚拟环境（Windows）
[创建虚拟环境](https://docs.python.org/zh-cn/3.10/library/venv.html)
```bash
python -m venv whisper_env
whsper_env\Scripts\activate.bat
```
2. 安装带CUDA的Pytorch
[使用pip安装Pytorch 2.0](https://pytorch.org/get-started/locally/)

3. 安装Whisper
[OpenAI Whisper](https://github.com/openai/whisper)
```bash
pip install -U openai-whisper
```
如果没有安装带CUDA的Pytorch，目前Whisper的一键安装脚本会默认安装使用CPU的版本，翻译效率很低。
这种情况下需要卸载当前的torch，重新执行步骤2
```bash
pip uninstall torch
# 清除缓存
pip cache purge
```
3. 安装ffmpeg
[Windos下安装choco](https://chocolatey.org/install#individual)

4. 翻译
```bash
whisper <文件> --language Chinese -o <输出地址> --model medium --no_speech_threshold 0.5 --logprob_threshold None --compression_ratio_threshold 2.2
```

whisper D:\Desktop\20230401路演_陈德伟.m4a --language Chinese-o D:\my_project\whisper --model medium


## 常用参数
options:
  -h, --help            show this help message and exit
  --model {tiny.en,tiny,base.en,base,small.en,small,medium.en,medium,large-v1,large-v2,large}
                        name of the Whisper model to use (default: small)
  --model_dir MODEL_DIR
                        the path to save model files; uses ~/.cache/whisper by default (default: None)
  --device DEVICE       device to use for PyTorch inference (default: cpu)
  --output_dir OUTPUT_DIR, -o OUTPUT_DIR
                        directory to save the outputs (default: .)
  --output_format {txt,vtt,srt,tsv,json,all}, -f {txt,vtt,srt,tsv,json,all}
                        format of the output file; if not specified, all available formats will be produced (default:
                        all)
  --verbose VERBOSE     whether to print out the progress and debug messages (default: True)
  --task {transcribe,translate}
                        whether to perform X->X speech recognition ('transcribe') or X->English translation
                        ('translate') (default: transcribe)
  --language {af,am,ar,as,az,ba,be,bg,bn,bo,br,bs,ca,cs,cy,da,de,el,en,es,et,eu,fa,fi,fo,fr,gl,gu,ha,haw,he,hi,hr,ht,hu,hy,id,is,it,ja,jw,ka,kk,km,kn,ko,la,lb,ln,lo,lt,lv,mg,mi,mk,ml,mn,mr,ms,mt,my,ne,nl,nn,no,oc,pa,pl,ps,pt,ro,ru,sa,sd,si,sk,sl,sn,so,sq,sr,su,sv,sw,ta,te,tg,th,tk,tl,tr,tt,uk,ur,uz,vi,yi,yo,zh,Afrikaans,Albanian,Amharic,Arabic,Armenian,Assamese,Azerbaijani,Bashkir,Basque,Belarusian,Bengali,Bosnian,Breton,Bulgarian,Burmese,Castilian,Catalan,Chinese,Croatian,Czech,Danish,Dutch,English,Estonian,Faroese,Finnish,Flemish,French,Galician,Georgian,German,Greek,Gujarati,Haitian,Haitian Creole,Hausa,Hawaiian,Hebrew,Hindi,Hungarian,Icelandic,Indonesian,Italian,Japanese,Javanese,Kannada,Kazakh,Khmer,Korean,Lao,Latin,Latvian,Letzeburgesch,Lingala,Lithuanian,Luxembourgish,Macedonian,Malagasy,Malay,Malayalam,Maltese,Maori,Marathi,Moldavian,Moldovan,Mongolian,Myanmar,Nepali,Norwegian,Nynorsk,Occitan,Panjabi,Pashto,Persian,Polish,Portuguese,Punjabi,Pushto,Romanian,Russian,Sanskrit,Serbian,Shona,Sindhi,Sinhala,Sinhalese,Slovak,Slovenian,Somali,Spanish,Sundanese,Swahili,Swedish,Tagalog,Tajik,Tamil,Tatar,Telugu,Thai,Tibetan,Turkish,Turkmen,Ukrainian,Urdu,Uzbek,Valencian,Vietnamese,Welsh,Yiddish,Yoruba}
                        language spoken in the audio, specify None to perform language detection (default: None)
  --temperature TEMPERATURE
                        temperature to use for sampling (default: 0)
  --best_of BEST_OF     number of candidates when sampling with non-zero temperature (default: 5)
  --beam_size BEAM_SIZE
                        number of beams in beam search, only applicable when temperature is zero (default: 5)
  --patience PATIENCE   optional patience value to use in beam decoding, as in https://arxiv.org/abs/2204.05424, the
                        default (1.0) is equivalent to conventional beam search (default: None)
  --length_penalty LENGTH_PENALTY
                        optional token length penalty coefficient (alpha) as in https://arxiv.org/abs/1609.08144, uses
                        simple length normalization by default (default: None)
  --suppress_tokens SUPPRESS_TOKENS
                        comma-separated list of token ids to suppress during sampling; '-1' will suppress most special
                        characters except common punctuations (default: -1)
  --initial_prompt INITIAL_PROMPT
                        optional text to provide as a prompt for the first window. (default: None)
  --condition_on_previous_text CONDITION_ON_PREVIOUS_TEXT
                        if True, provide the previous output of the model as a prompt for the next window; disabling
                        may make the text inconsistent across windows, but the model becomes less prone to getting
                        stuck in a failure loop (default: True)
  --fp16 FP16           whether to perform inference in fp16; True by default (default: True)
  --temperature_increment_on_fallback TEMPERATURE_INCREMENT_ON_FALLBACK
                        temperature to increase when falling back when the decoding fails to meet either of the
                        thresholds below (default: 0.2)
  --compression_ratio_threshold COMPRESSION_RATIO_THRESHOLD
                        if the gzip compression ratio is higher than this value, treat the decoding as failed
                        (default: 2.4)
  --logprob_threshold LOGPROB_THRESHOLD
                        if the average log probability is lower than this value, treat the decoding as failed
                        (default: -1.0)
  --no_speech_threshold NO_SPEECH_THRESHOLD
                        if the probability of the <|nospeech|> token is higher than this value AND the decoding has
                        failed due to `logprob_threshold`, consider the segment as silence (default: 0.6)
  --word_timestamps WORD_TIMESTAMPS
                        (experimental) extract word-level timestamps and refine the results based on them (default:
                        False)
  --prepend_punctuations PREPEND_PUNCTUATIONS
                        if word_timestamps is True, merge these punctuation symbols with the next word (default:
                        "'“¿([{-)
  --append_punctuations APPEND_PUNCTUATIONS
                        if word_timestamps is True, merge these punctuation symbols with the previous word (default:
                        "'.。,，!！?？:：”)]}、)
  --threads THREADS     number of threads used by torch for CPU inference; supercedes MKL_NUM_THREADS/OMP_NUM_THREADS
                        (default: 0)


`--no_speech_threshold` 无声识别的阈值，默认为 0.6。当 no_speech_threshold 高于阈值且 logprob_threshold 低于预设时，该片段将被标记为静默。对于非英语长视频来说，建议将其调低，否则经常出现大段的重复识别。
`--logprob_threshold` 转录频次的阈值，默认为 -1.0。当 logprob_threshold 低于预设时，将不对该片段进行转录。建议修改为 None 或更低的值。
`--compression_ratio_threshold` 压缩比的阈值，默认为 2.4。当 compression_ratio_threshold 高于预设时，将不对该片段进行转录。
```bash
# 参考参数
--no_speech_threshold 0.5 --logprob_threshold None --compression_ratio_threshold 2.2
```


# 参考资料
1. [OpenAI 开源语音识别 Whisper 的使用体验怎么样？](https://www.zhihu.com/question/575983499/answer/2958024440)
2. [【实时AI字幕】基于whisper的直播语音转字幕软件的安装与使用](https://www.bilibili.com/read/cv19274476)
3. [Openai-Whisper识别生成语音/视频字幕文件（支持自动翻译）](https://www.bilibili.com/read/cv19254244)
4. [OpenAI Whisper API 调用方法及效果对比](https://zhuanlan.zhihu.com/p/611322897)
5. [找不到字幕？Whisper 让不懂外语的你也能看懂日剧，支持99种语言](https://zhuanlan.zhihu.com/p/585113669)