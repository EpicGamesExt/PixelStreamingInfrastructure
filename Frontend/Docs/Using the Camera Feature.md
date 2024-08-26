## Camera feature summary

In its current state, the camera feature in Pixel Streaming is designed to pass the player’s video input audio from Pixel Streaming to Unreal Engine. The WebRTC video stream is exposed through a combination of the `IPixelStreamingVideoSink` and `IPixelStreamingVideoConsumer`. 

Users wishing to handle the rendering (or saving) of the incoming video outside of what is accomplished by the `UPixelStreamingVideoComponent` must do so by creating an implementation of an `IPixelStreamingVideoConsumer` that handles this before registering their consumer with the streamer. Example code can be seen below:

```c++
class FMyVideoConsumer : public IPixelStreamingVideoConsumer
{
public:
    virtual void ConsumeFrame(FTextureRHIRef Frame) override
    {
        // TODO: Handle the texture
    }

	virtual void OnConsumerAdded() override
    {
        UE_LOG(LogTemp, Display, TEXT("New consumer added!"));
    }

	virtual void OnConsumerRemoved() override
    {
        UE_LOG(LogTemp, Display, TEXT("Existing consumer removed!"));
    }
}

IPixelStreamingModule& Module = IPixelStreamingModule::Get();

TSharedPtr<IPixelStreamingStreamer> Streamer = Module.FindStreamer(Module.GetDefaultStreamerID());
if(!Streamer)
{
    return;
}

IPixelStreamingEpicRtcVideoSink* VideoSink = Streamer->GetUnwatchedVideoSink();
if(!VideoSink)
{
    return;
}

VideoSink->AddVideoConsumer(new FMyVideoConsumer()); 
```

## Enabling video input for Pixel Streaming in UE projects

Once you’ve enabled the Pixel Streaming plugin in your project, you’ll need to add the `Pixel Streaming Video` component to your scene. It can be attached to any actor or asset in the scene, following these steps:

- Select any enabled actor or asset in your scene;
- Click the *Add* button, located in its details panel;
- Type *Pixel Streaming Video* in the search bar and click the matching component:

<!-- <p align="center">
    <img src="Resources\Images\add-pixel-streaming-video-to-actor.png" alt="Add video component to actor">
</p> -->

Once the component has been added, you can adjust its settings and specify a player or streamer ID to watch, if you wish. The default configuration will be watching the first peer it can see and should be suitable for most basic use cases:

<!-- <p align="center">
    <img src="Resources\Images\settings-pixel-streaming-video.png" alt="Video Component configuration">
</p>	 -->

Select the PixelStreamingVideo component in the Blueprint. In the Details window under Pixel Streaming Video Component, you should see Pixel Streaming Video Consumer. Select the drop down and choose Pixel Streaming Media Texture. Name and save accordingly.

Create a simple plane object in your scene and re-size and shape it into a suitable display.

Drag your saved `PixelStreamingMediaTexture` directly from the content browser onto the plane in the scene. This will automatically create a Material and apply it to the object.

No more setup is required on the UE side, so the project is now ready to be packaged or used standalone.

## Enabling camera in Pixel Streaming frontend

Launch Pixel Streaming and click the cog icon to open the stream settings, where you can enable the camera toggle. Make sure to restart the stream to apply the changes:

<!-- <p align="center">
    <img src="Resources\Images\camera-toggle.png" alt="Component configuration">
</p>	 -->

*Note:* Alternatively, you can enable the camera by adding `?UseCamera=true` to the url. You’ll still need to refresh the page for the change to take effect.

When doing this for the first time, your browser will likely ask your permission to use the camera on this page, which you need to allow. Some browsers and firewalls may automatically block it, so you will need to create permission rules in your browser settings.

You are ready to roll! Connect to the stream. If everything has been set up correctly, your camera input will be passed to UE and played back to you by Pixel Streaming, so you will see yourself.

*Note:* The above steps will not work without the `Pixel Streaming Video` component set up in your project. If you don’t see any playback, double check your project for the appropriate component.
